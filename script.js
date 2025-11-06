
// Sample data
let schools = [
    {
        school_id: "school-001",
        학교명: "서울고등학교",
        주소: "서울시 강남구",
        접근성점수: 85,
        경사로: true,
        엘리베이터: true,
        화장실: false,
        주차장: true
    },
    {
        school_id: "school-002",
        학교명: "부산중학교",
        주소: "부산시 해운대구",
        접근성점수: 65,
        경사로: true,
        엘리베이터: false,
        화장실: true,
        주차장: false
    },
    {
        school_id: "school-003",
        학교명: "대구초등학교",
        주소: "대구시 수성구",
        접근성점수: 45,
        경사로: false,
        엘리베이터: false,
        화장실: false,
        주차장: true
    }
];

// Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'schools') {
        loadSchools();
    }
}

document.querySelectorAll('.header nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href').substring(1);
        showSection(sectionId);
    });
});

// Load schools
function loadSchools() {
    const schoolList = document.getElementById('schoolList');
    schoolList.innerHTML = '';
    
    schools.forEach(school => {
        const card = createSchoolCard(school);
        schoolList.appendChild(card);
    });
}

// Create school card
function createSchoolCard(school) {
    const card = document.createElement('div');
    card.className = 'school-card';
    card.onclick = () => showSchoolDetail(school);
    
    const scoreClass = school.접근성점수 >= 70 ? 'high' : school.접근성점수 >= 50 ? 'medium' : 'low';
    
    card.innerHTML = `
        <h3>${school.학교명}</h3>
        <p>${school.주소}</p>
        <span class="score-badge ${scoreClass}">접근성 ${school.접근성점수}점</span>
        <ul class="facility-list">
            <li>
                <span class="facility-icon ${school.경사로 ? 'available' : 'unavailable'}"></span>
                경사로
            </li>
            <li>
                <span class="facility-icon ${school.엘리베이터 ? 'available' : 'unavailable'}"></span>
                엘리베이터
            </li>
            <li>
                <span class="facility-icon ${school.화장실 ? 'available' : 'unavailable'}"></span>
                장애인 화장실
            </li>
            <li>
                <span class="facility-icon ${school.주차장 ? 'available' : 'unavailable'}"></span>
                장애인 주차장
            </li>
        </ul>
    `;
    
    return card;
}

// Search schools
function searchSchools() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredSchools = schools.filter(school => 
        school.학교명.toLowerCase().includes(searchTerm) ||
        school.주소.toLowerCase().includes(searchTerm)
    );
    
    const schoolList = document.getElementById('schoolList');
    schoolList.innerHTML = '';
    
    filteredSchools.forEach(school => {
        const card = createSchoolCard(school);
        schoolList.appendChild(card);
    });
}

// Show school detail
function showSchoolDetail(school) {
    const modal = document.getElementById('schoolModal');
    const modalBody = document.getElementById('modalBody');
    
    const scoreClass = school.접근성점수 >= 70 ? 'high' : school.접근성점수 >= 50 ? 'medium' : 'low';
    
    modalBody.innerHTML = `
        <h2>${school.학교명}</h2>
        <p><strong>주소:</strong> ${school.주소}</p>
        <p><strong>접근성 점수:</strong> <span class="score-badge ${scoreClass}">${school.접근성점수}점</span></p>
        <h3>시설 현황</h3>
        <ul class="facility-list">
            <li>
                <span class="facility-icon ${school.경사로 ? 'available' : 'unavailable'}"></span>
                경사로: ${school.경사로 ? '설치됨' : '미설치'}
            </li>
            <li>
                <span class="facility-icon ${school.엘리베이터 ? 'available' : 'unavailable'}"></span>
                엘리베이터: ${school.엘리베이터 ? '설치됨' : '미설치'}
            </li>
            <li>
                <span class="facility-icon ${school.화장실 ? 'available' : 'unavailable'}"></span>
                장애인 화장실: ${school.화장실 ? '설치됨' : '미설치'}
            </li>
            <li>
                <span class="facility-icon ${school.주차장 ? 'available' : 'unavailable'}"></span>
                장애인 주차장: ${school.주차장 ? '설치됨' : '미설치'}
            </li>
        </ul>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('schoolModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('schoolModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle report form
document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        학교명: document.getElementById('schoolName').value,
        시설유형: document.getElementById('facilityType').value,
        내용: document.getElementById('reportContent').value
    };
    
    const messageDiv = document.getElementById('formMessage');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        messageDiv.className = 'message success';
        messageDiv.textContent = '제보가 성공적으로 등록되었습니다!';
        
        document.getElementById('reportForm').reset();
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = '제보 등록에 실패했습니다. 다시 시도해주세요.';
    }
});

// Load API data (if available)
async function loadSchoolsFromAPI() {
    try {
        const response = await fetch('/api/schools');
        if (response.ok) {
            schools = await response.json();
            loadSchools();
        }
    } catch (error) {
        console.log('Using sample data');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSchoolsFromAPI();
});
