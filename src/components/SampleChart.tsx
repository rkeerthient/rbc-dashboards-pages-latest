import { TemplateProps } from "@yext/pages/*";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import * as React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { MyState } from "../redux/dashboardDataSlice";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

Chart.register(CategoryScale);

type Props = {
  document?: any;
  fields?: string[];
};
const SampleChart = ({ document, fields }: Props) => {
  const completionStatus = useSelector(
    (state: RootState) => state.dashboardSlice.completionStatus
  );
  const [textText, setTextText] = useState("");

  useEffect(() => {
    if (completionStatus) {
      setTextText(completionStatus.completionPercentage.toFixed(0));
    }
  }, [completionStatus]);

  return (
    <>
      {completionStatus && textText && (
        <div className="chart-container  ">
          <Doughnut
            data={{
              datasets: [
                {
                  data: [
                    completionStatus.completionPercentage,
                    completionStatus.completionPercentage - 100,
                  ],
                  backgroundColor: ["#4e9d3a", "#ecf0f1"],
                  borderWidth: 1,
                },
              ],
            }}
            className="!h-[200px] mx-auto md:!h-[500px] !w-auto"
            options={{
              cutout: "95%",
              circumference: 290,
              rotation: 220,
              plugins: {
                legend: {
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: "Completion percentage",
                },
              },
            }}
            plugins={[
              {
                id: "numberId",
                beforeDraw: function (chart) {
                  var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                  ctx.restore();
                  var fontSize = (height / 160).toFixed(2);
                  ctx.font = fontSize + "em sans-serif";
                  ctx.textBaseline = "top";
                  var text = textText,
                    textX = Math.round(
                      (width - ctx.measureText(text).width) / 2
                    ),
                    textY = height / 2;
                  ctx.fillText(text, textX, textY);
                  ctx.save();
                },
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default SampleChart;
