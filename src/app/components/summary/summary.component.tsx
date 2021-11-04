import { StocksSummary } from '../../app.definition';
import { useAppSelector } from '../../store/hooks';
import { selectSummary } from '../../store/stocks/stocks.selectors';

import style from './summary.component.module.scss';

const Summary: React.FC = () => {
  const summary = useAppSelector(selectSummary);

  return (
    <div className={style['summary-component']}>
      <h2>Summary</h2>
      <div className={style['summary-content']}>
        <table>
          <TableHeader />
          <TableBody summary={summary} />
        </table>
      </div>
    </div>
  );
};

export default Summary;

const TableHeader: React.FC = () => (
  <thead>
    <tr>
      <th>Stock</th>
      <th>Starting</th>
      <th>Lowest</th>
      <th>Highest</th>
      <th>Current</th>
    </tr>
  </thead>
);

const TableBody: React.FC<{
  summary: StocksSummary[];
}> = ({ summary }) => {
  return (
    <tbody>
      {summary.map((sum, i) => (
        <tr key={i}>
          <td>{sum.code}</td>
          <td>{sum.starting}</td>
          <td>{sum.lowest}</td>
          <td>{sum.highest}</td>
          <td>{sum.current}</td>
        </tr>
      ))}
    </tbody>
  );
};
