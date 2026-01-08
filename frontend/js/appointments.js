// Load appointments on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
});

// Save appointment
async function saveAppointment(event) {
    event.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Please log in first');
        return;
    }

    const doctorName = document.getElementById('doctorName').value;
    const type = document.getElementById('appointmentType').value;
    const date = new Date(document.getElementById('appointmentDate').value);
    const time = document.getElementById('appointmentTime').value;
    const location = document.getElementById('location').value;
    const notes = document.getElementById('appointmentNotes').value;

    // Combine date and time
    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours), parseInt(minutes));

    try {
        await db.collection('appointments').add({
            userId: userId,
            doctorName: doctorName,
            type: type,
            date: firebase.firestore.Timestamp.fromDate(date),
            time: time,
            location: location,
            notes: notes,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('✅ Appointment scheduled successfully!');
        document.getElementById('appointmentForm').reset();
        loadAppointments();

    } catch (error) {
        console.error('Error saving appointment:', error);
        alert('Error scheduling appointment. Please try again.');
    }
}

// Load appointments
async function loadAppointments() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        // Load upcoming appointments
        const upcomingSnapshot = await db.collection('appointments')
            .where('userId', '==', userId)
            .where('date', '>=', today)
            .orderBy('date', 'asc')
            .get();

        displayAppointments(upcomingSnapshot, 'upcomingAppointments', false);

        // Load past appointments
        const pastSnapshot = await db.collection('appointments')
            .where('userId', '==', userId)
            .where('date', '<', today)
            .orderBy('date', 'desc')
            .limit(5)
            .get();

        displayAppointments(pastSnapshot, 'pastAppointments', true);

    } catch (error) {
        console.error('Error loading appointments:', error);
    }
}

// Display appointments
function displayAppointments(snapshot, elementId, isPast) {
    const container = document.getElementById(elementId);

    if (snapshot.empty) {
        container.innerHTML = `<p>No ${isPast ? 'past' : 'upcoming'} appointments</p>`;
        return;
    }

    let html = '<table class="data-table"><thead><tr>';
    html += '<th>Date & Time</th><th>Doctor</th><th>Type</th><th>Location</th><th>Action</th>';
    html += '</tr></thead><tbody>';

    snapshot.forEach(doc => {
        const data = doc.data();
        const date = data.date.toDate();
        const dateStr = date.toLocaleDateString();
        const timeStr = data.time;

        html += `<tr>
            <td>${dateStr} ${timeStr}</td>
            <td>${data.doctorName}</td>
            <td>${data.type}</td>
            <td>${data.location}</td>
            <td>
                <button class="btn-delete" onclick="deleteAppointment('${doc.id}')">
                    Delete
                </button>
            </td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Delete appointment
async function deleteAppointment(docId) {
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    try {
        await db.collection('appointments').doc(docId).delete();
        alert('Appointment deleted successfully');
        loadAppointments();
    } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment');
    }
}