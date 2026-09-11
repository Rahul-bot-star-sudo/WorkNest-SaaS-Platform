const bcrypt = require('bcrypt');

(async () => {
  const plain = 'Admin@123';
  const hash = '$2b$10$zjeYW8fjdZh475UV1VYtBeP61ifzCQwQBCF5o6WlZxXiL0kjklNc2';

  const result = await bcrypt.compare(plain, hash);
  console.log('DIRECT BCRYPT RESULT:', result);
})();
