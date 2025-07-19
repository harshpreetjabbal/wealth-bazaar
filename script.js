document.getElementById('download-excel').addEventListener('click', function() {
    // Sample data - replace with your actual data
    const data = [
        ['Fund Name', '1Y Return', '3Y Return'],
        ['Quant Small Cap', '18%', '25%'],
        ['Parag Parikh Flexi Cap', '15%', '20%']
    ];
    
    let csvContent = data.map(e => e.join(",")).join("\n");
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'investment_report.csv');
    link.click();
});

document.getElementById('download-pdf').addEventListener('click', function() {
    // Using jsPDF library - include this in your head tag:
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text('Wealth Bazaar Investment Report', 10, 10);
    doc.text('Fund Name: Quant Small Cap', 10, 20);
    doc.text('1 Year Return: 18%', 10, 30);
    doc.save('investment_report.pdf');
});
let referrals = 0;

function updateAffiliateDashboard() {
    document.getElementById('ref-count').textContent = referrals;
    
    let rate = 0;
    let bonus = 0;
    
    if (referrals >= 21) {
        rate = 10;
        bonus = 5000;
    } else if (referrals >= 6) {
        rate = 7;
        bonus = 1000;
    } else if (referrals >= 1) {
        rate = 5;
        bonus = 500;
    }
    
    document.getElementById('commission-rate').textContent = rate + '%';
    const earnings = (referrals * 1000 * rate/100) + bonus;
    document.getElementById('projected-earnings').textContent = earnings;
}

// Example: Increment referrals (connect this to your actual referral system)
document.querySelectorAll('.referral-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        referrals++;
        updateAffiliateDashboard();
    });
});