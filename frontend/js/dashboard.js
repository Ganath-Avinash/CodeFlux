let wellnessChart;

// Load Dashboard Data
async function loadDashboard() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
        // Load user profile
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            document.getElementById('welcomeMessage').textContent = 
                `Welcome back, ${userData.name}!`;
        }

        // Load wellness data from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const wellnessSnapshot = await db.collection('wellness')
            .where('userId', '==', userId)
            .where('date', '>=', sevenDaysAgo)
            .orderBy('date', 'desc')
            .get();

        const wellnessData = [];
        wellnessSnapshot.forEach(doc => {
            wellnessData.push(doc.data());
        });

        // Calculate wellness score
        const avgScore = calculateWellnessScore(wellnessData);
        document.getElementById('wellnessScore').textContent = avgScore + '%';

        // Calculate hydration streak
        const streak = calculateHydrationStreak(wellnessData);
        document.getElementById('hydrationStreak').textContent = streak;

        // Calculate mood average
        const moodAvg = calculateMoodAverage(wellnessData);
        document.getElementById('moodAverage').textContent = moodAvg;

        // Load upcoming appointments
        const today = new Date();
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(today.getDate() + 30);

        const appointmentsSnapshot = await db.collection('appointments')
            .where('userId', '==', userId)
            .where('date', '>=', today)
            .where('date', '<=', thirtyDaysLater)
            .get();

        document.getElementById('upcomingCount').textContent = 
            appointmentsSnapshot.size;

        // Create chart
        createWellnessChart(wellnessData);

        // Load reminders
        loadReminders(userId);

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Calculate wellness score (0-100)
function calculateWellnessScore(data) {
    if (data.length === 0) return 0;

    let totalScore = 0;
    data.forEach(day => {
        let dayScore = 0;
        if (day.sleep >= 7) dayScore += 25;
        if (day.activity >= 30) dayScore += 25;
        if (day.hydration >= 8) dayScore += 25;
        if (day.mood >= 3) dayScore += 25;
        totalScore += dayScore;
    });

    return Math.round(totalScore / data.length);
}

// Calculate hydration streak
function calculateHydrationStreak(data) {
    if (data.length === 0) return 0;

    let streak = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].hydration >= 8) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

// Calculate mood average
function calculateMoodAverage(data) {
    if (data.length === 0) return 'N/A';

    const moodMap = {1: '😢', 2: '😕', 3: '😐', 4: '🙂', 5: '😄'};
    const avgMood = data.reduce((sum, day) => sum + day.mood, 0) / data.length;
    return moodMap[Math.round(avgMood)] || '😐';
}

// Create wellness chart
function createWellnessChart(data) {
    const ctx = document.getElementById('wellnessChart').getContext('2d');
    
    // Prepare data for last 7 days
    const labels = [];
    const sleepData = [];
    const activityData = [];
    const hydrationData = [];

    // Sort by date
    data.sort((a, b) => a.date.toDate() - b.date.toDate());

    data.forEach(day => {
        const date = day.date.toDate();
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        sleepData.push(day.sleep || 0);
        activityData.push(day.activity || 0);
        hydrationData.push(day.hydration || 0);
    });

    // Destroy existing chart if it exists
    if (wellnessChart) {
        wellnessChart.destroy();
    }

    wellnessChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Sleep (hours)',
                    data: sleepData,
                    borderColor: '#4b266f',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Activity (minutes)',
                    data: activityData,
                    borderColor: '#ebabffff',
                    backgroundColor: 'rgba(236, 161, 255, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Hydration (glasses)',
                    data: hydrationData,
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load preventive care reminders
async function loadReminders(userId) {
    const remindersList = document.getElementById('remindersList');
    
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    try {
        const snapshot = await db.collection('reminders')
            .where('userId', '==', userId)
            .where('dueDate', '<=', thirtyDaysLater)
            .orderBy('dueDate', 'asc')
            .get();

        if (snapshot.empty) {
            remindersList.innerHTML = '<p>No upcoming reminders. Add one in your profile!</p>';
            return;
        }

        let html = '<ul style="list-style: none; padding: 0;">';
        snapshot.forEach(doc => {
            const reminder = doc.data();
            const dueDate = reminder.dueDate.toDate();
            html += `
                <li style="padding: 10px; background: white; margin: 10px 0; border-radius: 8px;">
                    <strong>${reminder.title}</strong><br>
                    Due: ${dueDate.toLocaleDateString()}
                </li>
            `;
        });
        html += '</ul>';
        remindersList.innerHTML = html;

    } catch (error) {
        console.error('Error loading reminders:', error);
        remindersList.innerHTML = '<p>Error loading reminders</p>';
    }
}

// Load dashboard when page loads
document.addEventListener('DOMContentLoaded', loadDashboard);