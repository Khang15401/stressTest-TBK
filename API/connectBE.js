const axios = require('axios');

// Hàm tạo telegram_id ngẫu nhiên trong khoảng từ 200000000 đến 200000100
function generateRandomNumber() {
    return Math.floor(Math.random() * (200000101 - 200000000)) + 200000000;
}

// Gọi API với phương thức POST, Authorization Basic, và body
async function connectToBackend(telegram_id) {
    try {
        const response = await axios.post(
            'https://tbkx-core-be-sandbox.up.railway.app/user/connectBE',  // URL API
            { telegram_id: telegram_id },  // Body của request chứa telegram_id
            {
                headers: {
                    "Authorization": "Basic YWRtaW46NzNBRENBQTRGRTNDNUNCMzE2OTIxNjI1RjE3OUQ=",  // Sử dụng chuỗi Basic Auth đã mã hóa
                    "Content-Type": "application/json"  // Đặt loại nội dung là JSON
                }
            }
        );
        // console.log(`Thành công! Telegram ID: ${telegram_id}, Phản hồi từ API:`, response.data);
    } catch (error) {
        console.error(`Lỗi khi gọi API với telegram_id ${telegram_id}:`, error.response ? error.response.data : error.message);
    }
}

// Hàm thực hiện vòng lặp và gọi API nhiều lần
async function runMultipleRequests() {
    const numberOfRequests = 100;  // Số lần gọi API
    for (let i = 0; i < numberOfRequests; i++) {
        const randomTelegramId = generateRandomNumber();  // Tạo telegram_id ngẫu nhiên
        await connectToBackend(randomTelegramId);  // Gọi API với telegram_id ngẫu nhiên
    }
}

// Bắt đầu thực hiện
runMultipleRequests();
