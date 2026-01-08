// Set today's date as default
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('wellnessDate').value = today;
    loadWellnessHistory();
});

// Save wellness data
async function saveWellness(event) {
    event.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please log in first');
        return;
    }

    const date = new Date(document.getElementById('wellnessDate').value);
    const sleep = parseFloat(document.getElementById('sleep').value);
    const activity = parseInt(document.getElementById('activity').value);
    const hydration = parseInt(document.getElementById('hydration').value);
    const mood = parseInt(document.getElementById('mood').value);
    const notes = document.getElementById('notes').value;

    try {
        // Create a unique ID based on user and date
        const dateStr = date.toISOString().split('T')[0];
        const docId = `${userId}_${dateStr}`;

        await db.collection('wellness').doc(docId).set({
            userId: userId,
            date: firebase.firestore.Timestamp.fromDate(date),
            sleep: sleep,
            activity: activity,
            hydration: hydration,
            mood: mood,
            notes: notes,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Wellness data saved successfully!');
        document.getElementById('wellnessForm').reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('wellnessDate').value = today;
        
        loadWellnessHistory();

    } catch (error) {
        console.error('Error saving wellness data:', error);
        alert('Error saving data. Please try again.');
    }
}

// Load wellness history
async function loadWellnessHistory() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const historyDiv = document.getElementById('wellnessHistory');

    try {
        const snapshot = await db.collection('wellness')
            .where('userId', '==', userId)
            .orderBy('date', 'desc')
            .limit(10)
            .get();

        if (snapshot.empty) {
            historyDiv.innerHTML = '<p>No wellness logs yet. Start tracking today!</p>';
            return;
        }

        let html = '<table class="data-table"><thead><tr>';
        html += '<th>Date</th><th>Sleep</th><th>Activity</th><th>Hydration</th><th>Mood</th><th>Action</th>';
        html += '</tr></thead><tbody>';

        const moodMap = {1: '😢', 2: '😕', 3: '😐', 4: '🙂', 5: '😄'};

        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.date.toDate().toLocaleDateString();
            html += `<tr>
                <td>${date}</td>
                <td>${data.sleep}h</td>
                <td>${data.activity} min</td>
                <td>${data.hydration} glasses</td>
                <td>${moodMap[data.mood]}</td>
                <td><button class="btn-delete" onclick="deleteWellness('${doc.id}')">Delete</button></td>
            </tr>`;
        });

        html += '</tbody></table>';
        historyDiv.innerHTML = html;

    } catch (error) {
        console.error('Error loading history:', error);
        historyDiv.innerHTML = '<p>Error loading history</p>';
    }
}

// Delete wellness entry
async function deleteWellness(docId) {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
        await db.collection('wellness').doc(docId).delete();
        alert('Entry deleted successfully');
        loadWellnessHistory();
    } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Error deleting entry');
    }
}