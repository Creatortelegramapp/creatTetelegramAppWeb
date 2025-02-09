function DataIteration(props) {
  const { datas = [], startLength, endLength, children } = props;
  return (
    <div>
      {datas &&
        datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value) => children({ datas: value }))}
    </div>
  );
}

export default DataIteration;
