import React from "react";
import { AreaClosed, Line, Bar, LinePath } from "@vx/shape";
import { scaleTime, scaleLinear } from "@vx/scale";
import { withTooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { bisector } from "d3-array";
import { timeFormat } from "d3-time-format";
import { withParentSize } from "@vx/responsive";
import logo from "../assets/single-wave-loader.gif";

// placeholder stock

// util
const formatDate = timeFormat("%b %d %H:%M %p");
//const formatDate = timeFormat("%b %d");
const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = (d) => new Date(d.date * 1000);
const yStock = (d) => d.close;
const bisectDate = bisector((d) => new Date(d.date * 1000)).left;

class StockGraph extends React.Component {
  constructor(props) {
    super(props);
    this.handleTooltip = this.handleTooltip.bind(this);
  }
  handleTooltip({ event, data, xStock, xScale, yScale }) {
    const { showTooltip } = this.props;
    const { x } = localPoint(event);
    const x0 = xScale.invert(x);
    const index = bisectDate(data, x0, 0);
    const d0 = data[index];
    const d1 = data[index + 1];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(xStock(d)),
      tooltipTop: yScale(d.close),
    });
  }
  render() {
    const {
      height,
      margin,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      parentWidth,
      stock,
      nominalChange,
    } = this.props;

    // set proper height and width
    const width = parentWidth;

    const isPositive = nominalChange > 0;

    if (width < 10) return null;

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // scales
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(stock, xStock),
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [
        min(stock, yStock) - yMax / 100,
        max(stock, yStock) + yMax / 100,
      ],
      nice: true,
    });

    if (this.props.loading) {
      return (
        <div style={{ overflow: "hidden" }}>
          <svg ref={(s) => (this.svg = s)} width={width} height={height}>
            <image href={logo} height="700" width="700" y="-30%" />
          </svg>
        </div>
      );
    } else {
      return (
        <div style={{ height: "231px" }}>
          <svg ref={(s) => (this.svg = s)} width={width + 100} height={height}>
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill="#ffffff"
              rx={14}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="25%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "#1CCE98" : "#F35533"}
                  stopOpacity={0.4}
                />
                <stop
                  offset="80%"
                  stopColor={isPositive ? "#1CCE98" : "#F35533"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <AreaClosed
              data={stock}
              x={(d) => xScale(xStock(d))}
              y={(d) => yScale(yStock(d))}
              yScale={yScale}
              strokeWidth={2}
              stroke=""
              fill={"url(#gradient)"}
              curve={undefined}
            />

            <LinePath
              data={stock}
              x={(d) => xScale(xStock(d))}
              y={(d) => yScale(yStock(d))}
              stroke={isPositive ? "#1CCE98" : "#F35533"}
              strokeWidth={2}
              curve={undefined}
            />
            <Bar
              x={0}
              y={0}
              width={width}
              height={height}
              fill="transparent"
              rx={14}
              data={stock}
              onTouchStart={(event) =>
                this.handleTooltip({
                  event,
                  xStock,
                  xScale,
                  yScale,
                  data: stock,
                })
              }
              onTouchMove={(event) =>
                this.handleTooltip({
                  event,
                  xStock,
                  xScale,
                  yScale,
                  data: stock,
                })
              }
              onMouseMove={(event) =>
                this.handleTooltip({
                  event,
                  xStock,
                  xScale,
                  yScale,
                  data: stock,
                })
              }
              onMouseLeave={(event) => hideTooltip()}
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: 0 }}
                  to={{ x: tooltipLeft, y: yMax - 10 }}
                  stroke="rgba(34, 52, 110, 1)"
                  strokeWidth={2}
                  style={{ pointerEvents: "none" }}
                  strokeDasharray="7,7"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={5}
                  stroke="black"
                  strokeWidth={6}
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill="rgba(255, 255, 255, 1.000)"
                  stroke="white"
                  strokeWidth={3}
                  style={{ pointerEvents: "none" }}
                />
                <text x={tooltipLeft + 10} y={25} font-size="16">{`$${yStock(
                  tooltipData
                ).toFixed(2)}`}</text>
                <text x={tooltipLeft - 20} y={yMax} class="small">
                  {formatDate(xStock(tooltipData))}
                </text>
              </g>
            )}
          </svg>
        </div>
      );
    }
  }
}

export default withParentSize(withTooltip(StockGraph));
