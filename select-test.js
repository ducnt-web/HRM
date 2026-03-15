const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const inquirer = require('inquirer');

// Hàm kill port
function killPort(port) {
  exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
    if (stdout) {
      const lines = stdout.trim().split('\n');
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        exec(`taskkill /PID ${pid} /F`, () => {});
      });
    }
  });
}

// Đường dẫn thư mục tests
const testsDir = path.join(__dirname, 'tests');

// Hàm lấy danh sách file test
function getTestFiles() {
  const files = fs.readdirSync(testsDir);
  return files.filter(file => file.endsWith('.spec.ts'));
}

// Hàm chính
async function main() {
  const testFiles = getTestFiles();

  if (testFiles.length === 0) {
    console.log('Không tìm thấy file test nào trong thư mục tests/');
    return;
  }

  // Tạo danh sách lựa chọn
  const choices = testFiles.map(file => ({
    name: file,
    value: file
  }));

  // Thêm lựa chọn chạy tất cả
  choices.unshift({
    name: 'Chạy tất cả test',
    value: 'all'
  });

  const { selectedFile } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedFile',
      message: 'Chọn file test để chạy:',
      choices: choices
    }
  ]);

  // Chạy test
  let command;
  if (selectedFile === 'all') {
    command = 'npx playwright test';
  } else {
    command = `npx playwright test tests/${selectedFile}`;
    // Nếu là hrm-login-workflow.spec.ts, thêm --config
    if (selectedFile === 'hrm-login-workflow.spec.ts') {
      command += ' --config=./playwright.config.ts --headed';
    }
  }

  // Hỏi có muốn chạy với --headed không
  /*const { useHeaded } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useHeaded',
      message: 'Bạn có muốn chạy test với chế độ headed (thấy browser)?',
      default: false
    }
  ]);

  if (useHeaded) {
    command += ' --headed';
  }*/

  console.log(`\nChạy lệnh: ${command}\n`);
  exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Lỗi: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(stdout);

    // Luôn luôn mở báo cáo test
    console.log('\nMở báo cáo test...\n');
    killPort(9323);
    // Đợi một chút để kill xong
    setTimeout(() => {
      exec('npx playwright show-report', (error, stdout, stderr) => {
        if (error) {
          console.error(`Lỗi khi mở báo cáo: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        console.log(stdout);
      });
    }, 2000);
  });
}

main().catch(console.error);