import * as d3 from 'd3';

import { IDrawAreaArgs } from 'types/utils/d3/drawArea';

import { toTextEllipsis } from 'utils/helper';

import { CircleEnum } from './index';

function drawParallelArea(args: IDrawAreaArgs): void {
  const {
    index,
    nameKey,
    parentRef,
    visAreaRef,
    svgNodeRef,
    bgRectNodeRef,
    visBoxRef,
    plotNodeRef,
    axesNodeRef,
    plotBoxRef,
    linesNodeRef,
    attributesNodeRef,
    chartTitle = {},
  } = args;
  if (!parentRef?.current || !visAreaRef?.current) {
    return;
  }
  const parent = d3.select(parentRef.current);
  const visArea = d3.select(visAreaRef.current);
  const parentRect = parent.node().getBoundingClientRect();
  const { width, height } = parentRect;
  const { margin } = visBoxRef.current;
  // set visual box dimensions
  visBoxRef.current = {
    ...visBoxRef.current,
    width,
    height,
  };
  // set plot box dimensions
  plotBoxRef.current = {
    ...plotBoxRef.current,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  };
  const offsetWidth =
    width - margin.left - margin.right >= 0
      ? width - margin.left - margin.right
      : 0;
  const offsetHeight =
    width - margin.left - margin.right >= 0
      ? width - margin.left - margin.right
      : 0;

  visArea.style('width', `${width}px`).style('height', `${height}px`);

  svgNodeRef.current = visArea
    .append('svg')
    .attr('id', `${nameKey}-svg-area-${index}`)
    .attr('width', `${width}px`)
    .attr('height', `${height}px`)
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  bgRectNodeRef.current = svgNodeRef.current
    .append('rect')
    .attr('x', margin.left)
    .attr('class', 'backgroundRect')
    .attr('y', margin.top)
    .attr('width', offsetWidth)
    .attr('height', offsetHeight)
    .style('fill', 'transparent');

  plotNodeRef.current = svgNodeRef.current
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  axesNodeRef.current = plotNodeRef.current.append('g').attr('class', 'Axes');
  linesNodeRef.current = plotNodeRef.current.append('g').attr('class', 'Lines');

  linesNodeRef.current
    .append('clipPath')
    .attr('id', `${nameKey}-lines-rect-clip-${index}`)
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', offsetWidth)
    .attr('height', offsetHeight);

  attributesNodeRef.current = plotNodeRef.current
    .append('g')
    .attr('class', 'Attributes');

  attributesNodeRef.current
    .append('clipPath')
    .attr('id', `${nameKey}-circles-rect-clip-${index}`)
    .append('rect')
    .attr('x', -7)
    .attr('y', -7)
    .attr('width', offsetWidth + 2 * CircleEnum.ActiveRadius + 4)
    .attr('height', offsetHeight + 2 * CircleEnum.ActiveRadius + 4);

  const keys = Object.keys(chartTitle);
  const titleText = keys
    ? `${keys.map((key) => `${key}=${chartTitle[key]}`).join(', ')}`
    : '';
  const titleXAttr = margin.left / 6;
  const titleFontSize = '11px';
  const textEllipsis = toTextEllipsis({
    text: titleText,
    width: width - margin.left,
    fontSize: titleFontSize,
  });

  if (titleText) {
    const titleGroup = svgNodeRef.current
      .append('g')
      .attr('transform', `translate(${titleXAttr}, 3)`)
      .attr('font-size', titleFontSize);

    const chartIndex = titleGroup
      .append('text')
      .attr('x', 0)
      .attr('y', 12)
      .attr('fill', '#484f56')
      .style('outline', '1px solid #e8e8e8')
      .text(`${index + 1}`);

    chartIndex.append('tspan').text('[ ').attr('fill', 'none').lower();
    chartIndex.append('tspan').text(' ]').attr('fill', 'none').raise();

    titleGroup
      .append('text')
      .attr('x', titleXAttr + 39)
      .attr('y', 12)
      .attr('fill', '#484f56')
      .text(textEllipsis)
      .append('svg:title')
      .text(titleText);
  }
}
export default drawParallelArea;
