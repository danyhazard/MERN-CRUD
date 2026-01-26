import "../styles/table.css";

export default function Table({ columns, data, actions }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.label}>{col.label}</th>
            ))}
            {actions && <th style={{ width: "180px" }}>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                style={{ textAlign: "center" }}
              >
                No hay registros
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr key={row._id}>
              {columns.map((col) => (
                <td key={col.label}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="actions">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
