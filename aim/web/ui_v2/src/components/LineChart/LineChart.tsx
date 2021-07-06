import React, {
  FunctionComponentElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import useStyles from './style';
import { ILineChartProps } from '../../types/components/LineChart/LineChart';
import {
  drawArea,
  clearArea,
  drawAxes,
  drawLines,
  processData,
  getAxisScale,
} from '../../utils/d3';

function LineChart(
  props: ILineChartProps,
): FunctionComponentElement<ReactNode> {
  const { index, data, axisScaleType = {} } = props;
  const classes = useStyles();

  // boxes
  const visBoxRef = useRef({
    margin: {
      top: 24,
      right: 20,
      bottom: 30,
      left: 60,
    },
    height: null,
    width: null,
  });
  const plotBoxRef = useRef({
    height: null,
    width: null,
  });

  // containers
  const parentRef = useRef<HTMLDivElement>(null);
  const visAreaRef = useRef<HTMLDivElement>(null);

  // d3 elements
  const svgRef = useRef(null);
  const bgRectRef = useRef(null);
  const plotRef = useRef(null);
  const axesRef = useRef(null);
  const linesRef = useRef(null);
  const attributesRef = useRef(null);

  function draw(): void {
    drawArea({
      index,
      visBoxRef,
      plotBoxRef,
      parentRef,
      visAreaRef,
      svgRef,
      bgRectRef,
      plotRef,
      axesRef,
      linesRef,
      attributesRef,
    });

    const { processedData, min, max } = processData({ data });

    const { xScale, yScale } = getAxisScale({
      visBoxRef,
      axisScaleType,
      min,
      max,
    });

    drawAxes({
      axesRef,
      plotBoxRef,
      xScale,
      yScale,
    });

    drawLines({ data: processedData, linesRef, xScale, yScale });
  }

  const renderChart = useCallback((): void => {
    clearArea({ visAreaRef });
    draw();
  }, []);

  const resizeObserverCallback: ResizeObserverCallback = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (entries?.length) {
        requestAnimationFrame(renderChart);
      }
    },
    [renderChart],
  );

  useEffect(() => {
    const observer: ResizeObserver = new ResizeObserver(resizeObserverCallback);

    if (observer && parentRef.current) {
      observer.observe(parentRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [resizeObserverCallback]);

  return (
    <div ref={parentRef} className={classes.chart}>
      <div ref={visAreaRef} />
    </div>
  );
}

export default React.memo(LineChart);