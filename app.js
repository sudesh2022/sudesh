// ===== DATA STORAGE =====
class AppointmentManager {
    constructor() {
        this.appointments = this.loadFromStorage('appointments') || [];
        this.clients = this.loadFromStorage('clients') || [];
        this.currentView = 'dashboard';
        this.currentDate = new Date();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupModals();
        this.setupForms();
        this.setupCalendar();
        this.renderDashboard();
        this.updateStats();
    }

    // ===== STORAGE =====
    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from storage:', e);
            return null;
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to storage:', e);
        }
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(viewName) {
        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewName);
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');

        this.currentView = viewName;

        // Render view-specific content
        if (viewName === 'calendar') {
            this.renderCalendar();
        } else if (viewName === 'appointments') {
            this.renderAppointmentsTable();
        } else if (viewName === 'clients') {
            this.renderClients();
        } else if (viewName === 'dashboard') {
            this.renderDashboard();
        }
    }

    // ===== MODALS =====
    setupModals() {
        // Appointment modal
        const appointmentModal = document.getElementById('appointment-modal');
        const appointmentBtns = [
            document.getElementById('new-appointment-btn'),
            document.getElementById('new-appointment-btn-2')
        ];
        
        appointmentBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.openAppointmentModal());
            }
        });

        document.getElementById('close-appointment-modal').addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });

        document.getElementById('cancel-appointment').addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });

        appointmentModal.querySelector('.modal-overlay').addEventListener('click', () => {
            appointmentModal.classList.remove('active');
        });

        // Client modal
        const clientModal = document.getElementById('client-modal');
        const clientBtn = document.getElementById('new-client-btn');
        
        if (clientBtn) {
            clientBtn.addEventListener('click', () => this.openClientModal());
        }

        document.getElementById('close-client-modal').addEventListener('click', () => {
            clientModal.classList.remove('active');
        });

        document.getElementById('cancel-client').addEventListener('click', () => {
            clientModal.classList.remove('active');
        });

        clientModal.querySelector('.modal-overlay').addEventListener('click', () => {
            clientModal.classList.remove('active');
        });
    }

    openAppointmentModal() {
        this.updateClientSelect();
        document.getElementById('appointment-modal').classList.add('active');
        
        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('appointment-date').value = today;
    }

    openClientModal() {
        document.getElementById('client-modal').classList.add('active');
    }

    updateClientSelect() {
        const select = document.getElementById('client-select');
        select.innerHTML = '<option value="">Select a client</option>';
        
        this.clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = `${client.firstName} ${client.lastName}`;
            select.appendChild(option);
        });
    }

    // ===== FORMS =====
    setupForms() {
        // Appointment form
        document.getElementById('appointment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createAppointment();
        });

        // Client form
        document.getElementById('client-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createClient();
        });

        // Search
        const searchInput = document.getElementById('search-appointments');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchAppointments(e.target.value);
            });
        }
    }

    createAppointment() {
        const clientId = document.getElementById('client-select').value;
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const duration = parseInt(document.getElementById('appointment-duration').value);
        const type = document.getElementById('appointment-type').value;
        const notes = document.getElementById('appointment-notes').value;

        if (!clientId || !date || !time) {
            alert('Please fill in all required fields');
            return;
        }

        const appointment = {
            id: Date.now().toString(),
            clientId,
            date,
            time,
            duration,
            type,
            notes,
            status: 'upcoming',
            createdAt: new Date().toISOString()
        };

        this.appointments.push(appointment);
        this.saveToStorage('appointments', this.appointments);
        
        // Reset form and close modal
        document.getElementById('appointment-form').reset();
        document.getElementById('appointment-modal').classList.remove('active');
        
        // Update UI
        this.updateStats();
        this.renderDashboard();
        this.renderAppointmentsTable();
        this.renderCalendar();
    }

    createClient() {
        const firstName = document.getElementById('client-first-name').value;
        const lastName = document.getElementById('client-last-name').value;
        const email = document.getElementById('client-email').value;
        const phone = document.getElementById('client-phone').value;
        const notes = document.getElementById('client-notes').value;

        if (!firstName || !lastName || !email || !phone) {
            alert('Please fill in all required fields');
            return;
        }

        const client = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            phone,
            notes,
            createdAt: new Date().toISOString()
        };

        this.clients.push(client);
        this.saveToStorage('clients', this.clients);
        
        // Reset form and close modal
        document.getElementById('client-form').reset();
        document.getElementById('client-modal').classList.remove('active');
        
        // Update UI
        this.updateStats();
        this.renderClients();
    }

    deleteAppointment(id) {
        if (confirm('Are you sure you want to delete this appointment?')) {
            this.appointments = this.appointments.filter(apt => apt.id !== id);
            this.saveToStorage('appointments', this.appointments);
            this.updateStats();
            this.renderDashboard();
            this.renderAppointmentsTable();
            this.renderCalendar();
        }
    }

    deleteClient(id) {
        if (confirm('Are you sure you want to delete this client?')) {
            this.clients = this.clients.filter(client => client.id !== id);
            this.saveToStorage('clients', this.clients);
            this.updateStats();
            this.renderClients();
        }
    }

    // ===== STATS =====
    updateStats() {
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = this.appointments.filter(apt => apt.date === today);
        
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcomingAppointments = this.appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            return aptDate >= now && aptDate <= nextWeek && apt.status === 'upcoming';
        });

        const completedAppointments = this.appointments.filter(apt => apt.status === 'completed');

        document.getElementById('today-count').textContent = todayAppointments.length;
        document.getElementById('upcoming-count').textContent = upcomingAppointments.length;
        document.getElementById('completed-count').textContent = completedAppointments.length;
        document.getElementById('clients-count').textContent = this.clients.length;
    }

    // ===== DASHBOARD =====
    renderDashboard() {
        const upcomingList = document.getElementById('upcoming-list');
        const now = new Date();
        const upcoming = this.appointments
            .filter(apt => {
                const aptDate = new Date(`${apt.date}T${apt.time}`);
                return aptDate >= now && apt.status === 'upcoming';
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA - dateB;
            })
            .slice(0, 5);

        if (upcoming.length === 0) {
            upcomingList.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="32" fill="#f0f4ff"/>
                        <path d="M32 20V32L38 38" stroke="#667eea" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="32" cy="32" r="12" stroke="#667eea" stroke-width="3"/>
                    </svg>
                    <p>No upcoming appointments</p>
                </div>
            `;
        } else {
            upcomingList.innerHTML = upcoming.map(apt => {
                const client = this.clients.find(c => c.id === apt.clientId);
                const time = this.formatTime(apt.time);
                
                return `
                    <div class="appointment-item">
                        <div class="appointment-time">
                            <div class="appointment-time-hour">${time.hour}</div>
                            <div class="appointment-time-period">${time.period}</div>
                        </div>
                        <div class="appointment-details">
                            <div class="appointment-client">${client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}</div>
                            <div class="appointment-type">${this.capitalizeFirst(apt.type)} • ${apt.duration} min</div>
                        </div>
                        <span class="appointment-status status-upcoming">Upcoming</span>
                    </div>
                `;
            }).join('');
        }
    }

    // ===== APPOINTMENTS TABLE =====
    renderAppointmentsTable() {
        const tbody = document.getElementById('appointments-table-body');
        
        if (this.appointments.length === 0) {
            tbody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="6">
                        <div class="empty-state">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <circle cx="32" cy="32" r="32" fill="#f0f4ff"/>
                                <rect x="20" y="24" width="24" height="20" rx="2" stroke="#667eea" stroke-width="2"/>
                                <path d="M20 30H44" stroke="#667eea" stroke-width="2"/>
                            </svg>
                            <p>No appointments yet. Create your first one!</p>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            const sorted = [...this.appointments].sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateB - dateA;
            });

            tbody.innerHTML = sorted.map(apt => {
                const client = this.clients.find(c => c.id === apt.clientId);
                const dateTime = this.formatDateTime(apt.date, apt.time);
                
                return `
                    <tr>
                        <td><strong>${client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}</strong></td>
                        <td>${dateTime}</td>
                        <td>${apt.duration} min</td>
                        <td>${this.capitalizeFirst(apt.type)}</td>
                        <td><span class="appointment-status status-${apt.status}">${this.capitalizeFirst(apt.status)}</span></td>
                        <td>
                            <div class="table-actions">
                                <button class="btn-icon" onclick="app.editAppointment('${apt.id}')" title="Edit">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M12.5 2.5L15.5 5.5L6 15H3V12L12.5 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button class="btn-icon delete" onclick="app.deleteAppointment('${apt.id}')" title="Delete">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M3 5H15M7 8V13M11 8V13M4 5L5 15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H11C11.5304 17 12.0391 16.7893 12.4142 16.4142C12.7893 16.0391 13 15.5304 13 15L14 5M6 5V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2H11C11.2652 2 11.5196 2.10536 11.7071 2.29289C11.8946 2.48043 12 2.73478 12 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    editAppointment(id) {
        // TODO: Implement edit functionality
        alert('Edit functionality coming soon!');
    }

    searchAppointments(query) {
        // TODO: Implement search functionality
        console.log('Searching for:', query);
    }

    // ===== CLIENTS =====
    renderClients() {
        const grid = document.getElementById('clients-grid');
        
        if (this.clients.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="32" fill="#f0f4ff"/>
                        <circle cx="32" cy="26" r="8" stroke="#667eea" stroke-width="2"/>
                        <path d="M18 48C18 40.268 24.268 34 32 34C39.732 34 46 40.268 46 48" stroke="#667eea" stroke-width="2"/>
                    </svg>
                    <p>No clients yet. Add your first client!</p>
                </div>
            `;
        } else {
            grid.innerHTML = this.clients.map(client => {
                const initials = `${client.firstName[0]}${client.lastName[0]}`.toUpperCase();
                const appointmentCount = this.appointments.filter(apt => apt.clientId === client.id).length;
                
                return `
                    <div class="client-card">
                        <div class="client-header">
                            <div class="client-avatar">${initials}</div>
                            <div class="client-info">
                                <h4>${client.firstName} ${client.lastName}</h4>
                                <div class="client-email">${client.email}</div>
                            </div>
                        </div>
                        <div class="client-details">
                            <div class="client-detail-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 5C3 3.89543 3.89543 3 5 3H11C12.1046 3 13 3.89543 13 5V13C13 14.1046 12.1046 15 11 15H5C3.89543 15 3 14.1046 3 13V5Z" stroke="currentColor" stroke-width="1.5"/>
                                    <path d="M6 1V5M10 1V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <span>${appointmentCount} appointment${appointmentCount !== 1 ? 's' : ''}</span>
                            </div>
                            <div class="client-detail-item">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 5L8 9L14 5M3 13H13C13.5523 13 14 12.5523 14 12V4C14 3.44772 13.5523 3 13 3H3C2.44772 3 2 3.44772 2 4V12C2 12.5523 2.44772 13 3 13Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>${client.phone}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // ===== CALENDAR =====
    setupCalendar() {
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });
    }

    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthLabel = document.getElementById('current-month');
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        monthLabel.textContent = new Date(year, month).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        const todayDate = today.getDate();

        let html = '';
        
        // Day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasAppointments = this.appointments.some(apt => apt.date === dateStr);
            const isToday = isCurrentMonth && day === todayDate;
            
            const classes = ['calendar-day'];
            if (isToday) classes.push('today');
            if (hasAppointments) classes.push('has-appointments');
            
            html += `<div class="${classes.join(' ')}">${day}</div>`;
        }

        // Next month days
        const remainingDays = 42 - (firstDay + daysInMonth);
        for (let day = 1; day <= remainingDays; day++) {
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        calendar.innerHTML = html;
    }

    // ===== UTILITIES =====
    formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return {
            hour: `${displayHour}:${minutes}`,
            period
        };
    }

    formatDateTime(date, time) {
        const dateObj = new Date(date);
        const dateStr = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        const timeObj = this.formatTime(time);
        return `${dateStr} at ${timeObj.hour} ${timeObj.period}`;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize app
const app = new AppointmentManager();
