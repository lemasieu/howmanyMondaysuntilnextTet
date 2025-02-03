// Hàm đổi chế độ nền
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme', !isDark);
    document.getElementById('toggle-theme').innerText = isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';

    // Lưu trạng thái vào localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Tải trạng thái chế độ nền từ localStorage khi khởi động trang
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    document.body.classList.add(isDark ? 'dark-theme' : 'light-theme');
    document.getElementById('toggle-theme').innerText = isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
}

// Sự kiện chuyển đổi khi nhấn nút
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

// Tải chế độ nền khi mở trang
loadTheme();

// Các mã tính toán ngày Tết Nguyên Đán và hiển thị kết quả
/**
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.<p>
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 */
// ====== Chuyển đổi ngày dương ⇄ Julian Day ======
function jdFromDate(dd, mm, yy) {
    if (mm < 3) {
        yy--;
        mm += 12;
    }
    var A = Math.floor(yy / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (yy + 4716)) + Math.floor(30.6001 * (mm + 1)) + dd + B - 1524.5;
}

function jdToDate(jd) {
    var z = Math.floor(jd + 0.5);
    var a = (z >= 2299161) ? z + 1 + Math.floor((z - 1867216.25) / 36524.25) - Math.floor(Math.floor((z - 1867216.25) / 36524.25) / 4) : z;
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = b - d - Math.floor(30.6001 * e);
    var month = (e < 14) ? e - 1 : e - 13;
    var year = (month > 2) ? c - 4716 : c - 4715;
    return { day: day, month: month, year: year };
}

// ====== Tính ngày Sóc ======
function getNewMoonDay(k, timeZone) {
    var T = k / 1236.85, T2 = T * T, T3 = T2 * T;
    var dr = Math.PI / 180;
    var Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    return Math.floor(Jd1 + 0.5 + timeZone / 24);
}

// ====== Xác định tháng 11 âm lịch ======
function getLunarMonth11(year, timeZone) {
    let k = Math.floor((jdFromDate(31, 12, year - 1) - 2415021.076998695) / 29.530588853);
    return getNewMoonDay(k, timeZone);
}

// ====== Lấy ngày Tết Nguyên Đán ======
function getLunarNewYear(year, timeZone) {
    let lunarMonth11 = getLunarMonth11(year, timeZone);
    let k = Math.floor((lunarMonth11 - 2415021.076998695) / 29.530588853);
    return getNewMoonDay(k + 2, timeZone); // Lấy ngày Sóc thứ 2 sau tháng 11 âm lịch
}

// ====== Xác định ngày Tết Nguyên Đán tiếp theo ======
function getNextLunarNewYear(timeZone) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const todayJD = jdFromDate(today.getDate(), today.getMonth() + 1, today.getFullYear());

    // Lấy ngày Tết Nguyên Đán năm nay và năm sau (DƯƠNG LỊCH)
    const tetThisYearJD = getLunarNewYear(currentYear, timeZone);
    const tetThisYear = jdToDate(tetThisYearJD);
    
    const tetNextYearJD = getLunarNewYear(currentYear + 1, timeZone);
    const tetNextYear = jdToDate(tetNextYearJD);

    // So sánh ngày dương lịch hôm nay với ngày Tết Nguyên Đán
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tetThisYearDate = new Date(tetThisYear.year, tetThisYear.month - 1, tetThisYear.day);

    if (todayDate < tetThisYearDate) {
        return tetThisYear;
    } else {
        return tetNextYear;
    }
}

// ====== Tính số thứ Hai còn lại trước Tết ======
function calculateMondaysUntil(nextDate) {
    let today = new Date();
    let nextTet = new Date(nextDate.year, nextDate.month - 1, nextDate.day);
    let mondays = 0;

    while (today <= nextTet) {
        if (today.getDay() === 1) mondays++;
        today.setDate(today.getDate() + 1);
    }
    return mondays;
}

// ====== Cập nhật giao diện ======
const timeZone = 7; // Giờ Việt Nam (GMT+7)
const nextLunarNewYear = getNextLunarNewYear(timeZone);
const mondaysLeft = calculateMondaysUntil(nextLunarNewYear);

document.getElementById('tet-date').innerText = `Ngày Tết Nguyên Đán tiếp theo: ${nextLunarNewYear.day}/${nextLunarNewYear.month}/${nextLunarNewYear.year}`;
document.getElementById('days-until-monday').innerText = `Còn ${mondaysLeft} thứ Hai nữa để đến ngày đó.`;
