const { createElement, useState } = React;

let recognition = null;
let speechList = [];

const start = (setListenState, setSpeech) => {
  console.log('[START]start');

  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = true;
  recognition.onresult = (event) => {
    console.debug(event);

    const transcript = event.results[event.resultIndex][0].transcript.trim();
    const now = new Date();
    console.log({ createdAt: now, content: transcript });

    if (transcript) {
      console.log([{ createdAt: now, content: transcript }, ...speechList]);
      setSpeech([{ createdAt: now, content: transcript }, ...speechList]);
      speechList = [{ createdAt: now, content: transcript }, ...speechList];
    }
  };
  recognition.onend = () => {
    console.log('onend');
    setListenState("ready");
  };
  recognition.onerror = (event) => {
    console.error(event);
    start(setListenState, setSpeech);
  };

  recognition.start();

  setListenState("listening");

  console.log('[END]start');
};

const stop = (setListenState) => {
  recognition.stop();
  setListenState("ready");
};

const clear = (setListenState, setSpeechList) => {
  setSpeechList([]);
  setListenState("ready");
};

const promptSummary = (input) => {
  return `
  ## 命令
  以下の文章を要約してください
  ## ルール
  - 1文あたり30文字以内
  - 要点は5つ以内
  - 箇条書きで出力
  ## 文章
  ${input}
  `;
}

const summary = async (apiKey, input) => {
  return await postChatCompletion(apiKey, promptSummary(input));
};

const usePersist = (_key, initialValue) => {
  const key = 'hooks:' + _key
  const value = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  }
  const setValue = (value) => {
    try {
      setSavedValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }
  const [savedValue, setSavedValue] = useState(value)
  return [savedValue, setValue]
}


const postChatCompletion = async (apiKey, input, model = 'gpt-3.5-turbo') => {
  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: input,
        }
      ]
    })
  })
    .then((response) => response.json())
    .then((body) => {
      return body.choices[0].message.content;
    })
    .catch((error) => {
      console.error(error);
    });
};

const RecordingPage = () => {
  const [listenState, setListenState] = useState("ready");
  const [speechList, setSpeechList] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [apiKey, setApiKey] = usePersist('apiKey', "");

  return (
    <div className="uk-container-xsmall">
      {/* <TextArea label="聞き取り結果" value={speechList.map(speech => speech.content).join("\n")} height={"300px"} disabled></TextArea> */}
      <div>
        <ul>
          {
            speechList.map(speech => {
              return (
                <li key={speech.createdAt}>{speech.content} {speech.createdAt.getHours()}:{speech.createdAt.getMinutes()}</li>
              );
            })
          }
        </ul>
      </div>

      {
        listenState === "ready" ?
          <button onClick={() => { start(setListenState, setSpeechList) }} className="uk-button uk-button-default"><span uk-icon="microphone"></span>会話をメモに残す</button>
          :
          <button onClick={() => { stop(setListenState) }} className="uk-button uk-button-default"><span uk-icon="microphone"></span>聞き取り中...</button>
      }
      <button onClick={() => { clear(setListenState, setSpeechList) }} className="uk-button uk-button-default" disabled={listenState === "listening"}><span uk-icon="trash"></span>クリア</button>

      <hr className="uk-divider-icon"></hr>

      <Input label="API Key" type="password" value={apiKey} onChange={(event) => { setApiKey(event.target.value) }}></Input>
      {
        apiKey && speechList.length > 0 ?
          <button onClick={() => {
            summary(apiKey, speechList.map(speech => speech.content).join(" ")).then((summary) => {
              setAiSummary(summary);
            });
          }} className="uk-button uk-button-default"><span uk-icon="microphone"></span>要約する</button>
          :
          <button className="uk-button uk-button-default" disabled><span uk-icon="microphone"></span>要約する</button>
      }
      <TextArea label="AI要約" value={aiSummary} height={"300px"} disabled></TextArea>
    </div>
  );
};
