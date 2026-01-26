export default function PermissionGroup({ group, values, onChange }) {
  return (
    <div className="permission-group">
      <h4>{group.label}</h4>

      {group.permissions.map(p => (
        <label key={p.key} className="checkbox">
          <input
            type="checkbox"
            checked={values.includes(p.key)}
            onChange={() => onChange(p.key)}
          />
          {p.label}
        </label>
      ))}
    </div>
  );
}
