const EquationMapper = module.exports;

EquationMapper.mapPointDistance = (point, distance) => {
  const { x, y } = point;
  const d2 = distance ** 2;

  return `${d2} = (${x} - x)^2 + (${y} - y)^2`;
};
