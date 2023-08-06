const { createElement, useState } = React;

let recognition = null;
let speechList = [];

const start = (speechList, setSpeechList) => {
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
      setSpeechList([{ createdAt: now, content: transcript }, ...speechList]);
      speechList = [{ createdAt: now, content: transcript }, ...speechList];
    }
  };
  recognition.onend = () => {
    console.log('onend');
  };
  recognition.onerror = (event) => {
    console.error(event);
    start(setSpeechList);
  };

  recognition.start();

  console.log('[END]start');
};

const stop = () => {
  recognition.stop();
};

const items = [
  {
    type: 'image',
    createdAt: new Date('2023-08-06 10:39:05'),
    content: './img/picture.jpeg'
  },
  {
    type: 'text',
    createdAt: new Date('2023-08-06 10:30:05'),
    content: '天神大和証券前で降りてください'
  },
  {
    type: 'text',
    createdAt: new Date('2023-08-06 10:30:00'),
    content: 'エンジニアカフェに行くにはどのバス停で降りたら良いですか？'
  },
];

const TimelinePage = () => {
  const [speechList, setSpeechList] = useState(items);

  const generateTimelineContent = (item) => {
    return (
      <div key={item.createdAt.getTime()}>
        <div className="timeline-page-line">
          <div className="timeline-page-line-item timeline-page-line-item-left"></div>
          <div className="timeline-page-line-item"></div>
        </div>
        <div className="timeline-page-item">
          <div className="timeline-page-item-date">
            {item.createdAt.getHours()}:{item.createdAt.getMinutes()}
          </div>
          <div className="timeline-page-item-content">
            {
              item.type === 'image' ? (
                <img src={item.content} className="timeline-page-item-content-image"></img>
              ) : (
                <span className="timeline-page-item-content-text">{item.content}</span>
              )
            }
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="timeline-page">
      <div className="timeline-page-line-start">
        <div className="timeline-page-line-start-ball"></div>
      </div>
      {
        speechList.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((content) => generateTimelineContent(content))
      }
      <div className="timeline-page-record-buttons">
        <button className="timeline-page-record-buttons-button">写真</button>
        <button className="timeline-page-record-buttons-button" onClick={() => start(speechList, setSpeechList)}>録音</button>
      </div>
    </div>
  );
};
