export function transactionsToCsv(rows) {
  const header = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const lines = [header.join(',')];
  for (const r of rows) {
    const cells = [
      r.date,
      `"${String(r.description).replace(/"/g, '""')}"`,
      r.category,
      r.type,
      Number(r.amount).toFixed(2),
    ];
    lines.push(cells.join(','));
  }
  return lines.join('\n');
}

export function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
