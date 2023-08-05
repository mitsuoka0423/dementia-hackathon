const RecordingPage = () => {
  const [listenState, setListenState] = useState("ready");
  const [speechList, setSpeechList] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [apiKey, setApiKey] = usePersist('apiKey', "");

  return (
    <div className="uk-container-xsmall">
      <HelpMarkPage />

      <hr className="uk-divider-icon"></hr>

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
