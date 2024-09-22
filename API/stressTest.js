// const axios = require('axios');
// const fs = require('fs');

// // URL của API và Bearer Token
// const url = 'https://tbkx-core-be-sandbox.up.railway.app/user/connectBE';
// const token = 'YWRtaW46NzNBRENBQTRGRTNDNUNCMzE2OTIxNjI1RjE3OUQ='; 
// const numberOfRequests = 1;  // Số lần gọi API
// const delayBetweenRequests = 10;  // Độ trễ giữa các yêu cầu (ms)

// let successCount = 0;
// let failureCount = 0;
// let accessTokens = [];  // Mảng để lưu các access token
// let responseTimes = [];  // Mảng để lưu thời gian phản hồi
// let startTime;  // Thời gian bắt đầu stress test

// // Hàm tạo telegram_id ngẫu nhiên từ 200000000 đến 200000100

// function generateRandomNumber() {
//     return String(Math.floor(100000000 + Math.random() * 900000000));  // Tạo số ngẫu nhiên có 9 chữ số
// }

// // Hàm gửi yêu cầu POST tới API và truyền telegram_id ngẫu nhiên
// async function sendRequest(requestNumber, telegram_id) {
//     const requestStartTime = Date.now();  // Bắt đầu tính thời gian phản hồi
//     try {
//         const response = await axios.post(url, {
//             telegram_id: telegram_id  // Dữ liệu yêu cầu với telegram_id ngẫu nhiên
//         }, {
//             headers: {
//                 'Authorization': `Basic ${token}`,
//                 "Content-Type": "application/json"
//             }
//         });
        
//         const requestEndTime = Date.now();  // Kết thúc thời gian phản hồi
//         const responseTime = requestEndTime - requestStartTime;  // Tính toán thời gian phản hồi
//         responseTimes.push(responseTime);  // Lưu thời gian phản hồi vào mảng
        
//         const accessToken = response.data.access_token; // Lấy access_token từ response
//         if (accessToken) {
//             accessTokens.push(accessToken);  // Lưu access token vào mảng
//         }
        
//         // In toàn bộ nội dung response trả về
//         console.log(`Request ${requestNumber}: Success (Status: ${response.status}), Telegram ID: ${telegram_id}, Response Time: ${responseTime} ms`);
//         console.log("Response Data:", response.data);
        
//         // In ra các giá trị cụ thể từ response
//         console.log("New User:", response.data.newUser);
//         console.log("User ID:", response.data.user_id);
//         console.log("Affiliate Status:", response.data.aff_status);
//         console.log("Access Token:", response.data.access_token);
//         console.log("Access Token Expires In:", response.data.access_token_expires_in);
//         console.log("Refresh Token:", response.data.refresh_token);
//         console.log("Refresh Expires In:", response.data.refresh_expires_in);

//     } catch (error) {
//         const requestEndTime = Date.now();  // Kết thúc thời gian phản hồi
//         const responseTime = requestEndTime - requestStartTime;
//         responseTimes.push(responseTime);  // Vẫn lưu thời gian phản hồi cho thất bại

//         failureCount++;  // Tăng số lượng yêu cầu thất bại
//         const status = error.response ? error.response.status : "No Response";
//         console.error(`Request ${requestNumber}: Failed (Status: ${status}), Telegram ID: ${telegram_id}, Response Time: ${responseTime} ms`);
//     }

//     // Nếu tất cả các yêu cầu đã hoàn tất, in báo cáo kết quả và lưu access tokens
//     if (successCount + failureCount === numberOfRequests) {
//         printReport();
//         saveTokensToFile();
//     }
// }

// // Vòng lặp thực hiện nhiều yêu cầu API
// function runStressTest() {
//     startTime = Date.now();  // Lưu thời gian bắt đầu stress test
//     for (let i = 0; i < numberOfRequests; i++) {
//         const randomTelegramId = generateRandomNumber();  // Tạo telegram_id ngẫu nhiên
//         setTimeout(() => {
//             sendRequest(i + 1, randomTelegramId);  // Gọi API với telegram_id ngẫu nhiên
//         }, i * delayBetweenRequests);
//     }
// }

// // In báo cáo kết quả sau khi tất cả các yêu cầu đã hoàn thành
// function printReport() {
//     const total = successCount + failureCount;
//     const successRate = ((successCount / total) * 100).toFixed(2);
//     const failureRate = ((failureCount / total) * 100).toFixed(2);

//     // Tính toán thời gian phản hồi
//     const minResponseTime = Math.min(...responseTimes);
//     const maxResponseTime = Math.max(...responseTimes);
//     const avgResponseTime = (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2);

//     // Tính toán thời gian hoàn thành stress test
//     const endTime = Date.now();
//     const testDuration = ((endTime - startTime) / 1000).toFixed(2);  // Chuyển đổi từ ms sang giây

//     console.log('\n==== Stress Test Report ====');
//     console.log(`Total Requests: ${total}`);
//     console.log(`Successful Requests: ${successCount} (${successRate}%)`);
//     console.log(`Failed Requests: ${failureCount} (${failureRate}%)`);
//     console.log(`Min Response Time: ${minResponseTime} ms`);
//     console.log(`Max Response Time: ${maxResponseTime} ms`);
//     console.log(`Average Response Time: ${avgResponseTime} ms`);
//     console.log(`Error Rate: ${failureRate}%`);
//     console.log(`Stress Test Completed in: ${testDuration} seconds`);
//     console.log('============================\n');
// }

// // Hàm lưu access tokens vào file
// function saveTokensToFile() {
//     const filePath = './accessTokens.json';  // Đường dẫn file
//     const data = JSON.stringify(accessTokens, null, 2);  // Chuyển đổi mảng thành chuỗi JSON

//     fs.writeFile(filePath, data, (err) => {
//         if (err) {
//             console.error('Lỗi khi ghi file:', err);
//         } else {
//             console.log('Access tokens đã được lưu vào file accessTokens.json');
//         }
//     });
// }

// // Bắt đầu stress test
// runStressTest();



const axios = require('axios');
const fs = require('fs');

const url = 'https://be.tonbooking.com/user/connectBE';
const token = 'YWRtaW46cDcjXkUhM2JOUWZGWCFZJnY5NUxCSg=='; 
let accessTokens = [];  // Array to store access tokens

function saveTokensToFile() {
    const filePath = './accessTokens2.csv';
    
    // Chuyển đổi mảng accessTokens thành chuỗi, mỗi token là một dòng
    const data = accessTokens.join('\n');
    
    // Ghi vào file CSV
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Access tokens saved to accessTokens.csv');
        }
    });
}

// Request handling
async function sendRequest(telegram_id) {
    try {
        const response = await axios.post(url, { telegram_id }, {
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const accessToken = response.data.access_token;
        if (accessToken) {
            accessTokens.push(accessToken);  // Push access token to array
        }

    } catch (error) {
        console.error('API Request Failed', error);
    }
}

// Stress Test: Call API multiple times
async function runStressTest() {
    // Random Telegram ID generator
    function generateRandomNumber() {
        return String(Math.floor(100000000 + Math.random() * 900000000));  // Generate a random 9-digit number
    }

    let requestCount = 0
    const numberOfRequests = 300;  // Define how many requests you want
    for (let i = 0; i < numberOfRequests; i++) {
        const telegram_id = generateRandomNumber();  // Generate random ID
        await sendRequest(telegram_id);
        requestCount++;
        console.log("Request: ", requestCount);
    }

    // Save access tokens after all requests
    saveTokensToFile();
}


// Start the stress test
runStressTest();
