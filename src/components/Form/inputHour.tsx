import { useState } from 'react';

export default function InputHour() {
  const [hour, setHour] = useState<string>('');
  return (
    <div>
      <input
        value={hour}
        onChange={(e) => setHour(e.target.value)}
      />
    </div>
  );
}
