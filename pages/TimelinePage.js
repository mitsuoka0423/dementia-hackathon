const TimelinePage = () => {
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
    {
      type: 'text',
      createdAt: new Date('2023-08-06 10:36:05'),
      content: '天神大和証券前で降りてください'
    },
    {
      type: 'text',
      createdAt: new Date('2023-08-06 10:35:00'),
      content: 'エンジニアカフェに行くにはどのバス停で降りたら良いですか？'
    },
  ];

  const generateTimelineContent = (item) => {
    return (
      <div>
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
        items.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map((content) => generateTimelineContent(content))
      }
      <div className="timeline-page-record-buttons">
        <button className="timeline-page-record-buttons-button">写真</button>
        <button className="timeline-page-record-buttons-button">録音</button>
      </div>
    </div>
  );
};
