import { useEffect, useState } from "react";

function App() {
  // 초기 로딩용 State
  const [loading, setLoaing] = useState(true);
  // 코인 출력용 State
  const [coins, setCoins] = useState([]);
  // 코인 환율 변환 State
  const [money, setMoeny] = useState();
  
  // 값을 입력할 때 마다 바로바로 갱신
  const onChange = (event) => {
    setMoeny(event.target.value);
  };
  
  // 코인 환율 change버튼 State
  const [changer, setChanger] = useState(false);
  const onFlip = () => {
    reset(); //change 시 입력칸 0로 초기화
    setChanger((current) => !current);
  };

  // 리셋 버튼
  const reset = () => setMoeny(0);

  useEffect(() => {
    // 코인 API
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoaing(false);
      });
  }, []);

  return (
    <div>
      <h1>코인 환전기 {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      {loading ? null : (
        <div>
          <h2>달러코인 환전</h2>
          <label htmlFor="USD">USD</label>
          <input
            id="USD"
            value={changer ? money * 19293 : money}
            type="number"
            onChange={onChange}
            placeholder="USD"
            disabled={changer}
          />
          <br />
          <label htmlFor="BTC">BTC</label>
          <input
            id="BTC"
            value={changer ? money : money * 0.000052}
            type="number"
            onChange={onChange}
            placeholder="BTC"
            disabled={!changer}
          />
          <br />
          <button onClick={onFlip}>변환</button>
          <button onClick={reset}>초기화</button>
        </div>
      )}
    </div>
  );
}

export default App;
