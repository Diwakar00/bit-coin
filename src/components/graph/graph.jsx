import { Line } from "react-chartjs-2";

const Graph = (props) => {
  let labels = Object.keys(props.historyData);
  let datas = Object.values(props.historyData);
  let data = {
    labels,
    datasets: [{ label: "chart", data: datas }],
    borderColor: ["rgba(255, 206, 86, 0.5)"],
  };
  return (
    <div>
      <Line data={data} width={80} height={30} defaults />
    </div>
  );
};

export default Graph;
