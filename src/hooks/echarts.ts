import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from "echarts/charts";
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  LegendComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

// 组合 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件和图表
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default echarts;
