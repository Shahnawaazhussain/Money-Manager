class Transaction {
    constructor(id, amount, date, type, subCategory, description) {
        this.id = id || Date.now();
        this.amount = parseFloat(amount);
        this.date = date;
        this.type = type;
        this.subCategory = subCategory;
        this.description = description || 'No description';
    }
}

class MoneyManager {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('AtelierStorage')) || [];
        this.init();
    }

    init() {
        this.setupEvents();
        this.updateSubCategories();
        this.render();
    }

    // Validation
    validate() {
        let isValid = true;
        const amount = document.getElementById('form-amount');
        const date = document.getElementById('form-date');
        
        // Reset
        [amount, date].forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('.error-text').forEach(t => t.innerText = '');

        if (!amount.value || amount.value <= 0) {
            amount.classList.add('input-error');
            document.getElementById('amount-error').innerText = "Enter a valid positive amount";
            isValid = false;
        }

        if (!date.value || new Date(date.value) > new Date()) {
            date.classList.add('input-error');
            document.getElementById('date-error').innerText = "Date cannot be in the future";
            isValid = false;
        }

        return isValid;
    }

    save(data) {
        const idx = this.transactions.findIndex(t => t.id == data.id);
        if (idx > -1) this.transactions[idx] = data;
        else this.transactions.push(data);
        localStorage.setItem('AtelierStorage', JSON.stringify(this.transactions));
        this.render();
    }

    delete(id) {
        if(confirm("Delete this entry?")) {
            this.transactions = this.transactions.filter(t => t.id != id);
            localStorage.setItem('AtelierStorage', JSON.stringify(this.transactions));
            this.render();
        }
    }

    render() {
        const container = document.getElementById('transaction-rows');
        const filter = document.getElementById('filter-type').value;
        const sortBy = document.getElementById('sort-by').value;

        let filtered = this.transactions.filter(t => filter === 'all' || t.type === filter);

        filtered.sort((a, b) => {
            if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'amount-high') return b.amount - a.amount;
            if (sortBy === 'amount-low') return a.amount - b.amount;
        });

        container.innerHTML = filtered.map(t => `
            <tr>
                <td style="color: #64748b; font-weight: 500;">${t.date}</td>
                <td style="color: #555; font-weight: 500;">${t.description}</td>
                <td><span style="background: #f1f5f9; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;">${t.subCategory}</span></td>
                <td class="text-right" style="font-weight: 600; color: ${t.type === 'income' ? '#10b981' : '#1e293b'}">
                    ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}
                </td>
                <td class="text-center">
                    <button onclick="app.editUI(${t.id})" style="border:none; background:none; cursor:pointer; margin-right: 10px;"><span class="material-symbols-outlined" style="font-size:18px">edit</span></button>
                    <button onclick="app.delete(${t.id})" style="border:none; background:none; cursor:pointer; color: #ef4444;"><span class="material-symbols-outlined" style="font-size:18px">delete</span></button>
                </td>
            </tr>
        `).join('');

        this.updateTotals();
    }

    updateTotals() {
        const income = this.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expense = this.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        document.getElementById('total-income').innerText = `$${income.toFixed(2)}`;
        document.getElementById('total-expense').innerText = `$${expense.toFixed(2)}`;
        document.getElementById('net-balance').innerText = `$${(income - expense).toFixed(2)}`;
    }

    updateSubCategories() {
        const type = document.querySelector('input[name="type"]:checked').value;
        const select = document.getElementById('form-category');
        const options = type === 'income' ? ['Salary', 'Bonus', 'Investment'] : ['Rent', 'Food', 'Transport', 'Shopping'];
        select.innerHTML = options.map(o => `<option value="${o}">${o}</option>`).join('');
    }

    editUI(id) {
        const t = this.transactions.find(x => x.id == id);
        document.getElementById('edit-id').value = t.id;
        document.getElementById('form-amount').value = t.amount;
        document.getElementById('form-date').value = t.date;
        document.querySelector(`input[name="type"][value="${t.type}"]`).checked = true;
        this.updateSubCategories();
        document.getElementById('form-category').value = t.subCategory;
        document.getElementById('form-desc').value = t.description;
        document.getElementById('modal-overlay').classList.remove('modal-hidden');
    }

    setupEvents() {
        document.getElementById('open-modal-btn').onclick = () => {
            document.getElementById('transaction-form').reset();
            document.getElementById('edit-id').value = '';
            document.getElementById('form-date').valueAsDate = new Date();
            this.updateSubCategories();
            document.getElementById('modal-overlay').classList.remove('modal-hidden');
        };

        document.getElementById('close-modal').onclick = () => document.getElementById('modal-overlay').classList.add('modal-hidden');

        document.querySelectorAll('input[name="type"]').forEach(r => {
            r.onchange = () => this.updateSubCategories();
        });

        document.getElementById('transaction-form').onsubmit = (e) => {
            e.preventDefault();
            try {
                if(this.validate()) {
                    const data = new Transaction(
                        document.getElementById('edit-id').value,
                        document.getElementById('form-amount').value,
                        document.getElementById('form-date').value,
                        document.querySelector('input[name="type"]:checked').value,
                        document.getElementById('form-category').value,
                        document.getElementById('form-desc').value
                    );
                    this.save(data);
                    document.getElementById('modal-overlay').classList.add('modal-hidden');
                }
            } catch(e) { console.error(e); }
        };

        document.getElementById('filter-type').onchange = () => this.render();
        document.getElementById('sort-by').onchange = () => this.render();
    }
}

const app = new MoneyManager();