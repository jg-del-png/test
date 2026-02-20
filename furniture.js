// ----------------------
// MODELS
// ----------------------
const MODEL = {
    items: ["Chair", "Loveseat", "Couch"],
    prices: [17.75, 32.99, 45.00],

    zones: {
        1: 0.00,
        2: 20.00,
        3: 30.00,
        4: 35.00,
        5: 45.00,
        6: 50.00
    },

    stateZones: {
        "WA": 5, "OR": 5, "CA": 4, "NV": 5, "ID": 5,
        "MT": 5, "WY": 5, "UT": 5, "AZ": 5, "NM": 5,
        "CO": 4, "ND": 4, "SD": 4, "NE": 4, "KS": 3,
        "OK": 4, "MN": 3, "IA": 3, "MO": 3, "AR": 4,
        "LA": 4, "WI": 3, "IL": 3, "MS": 4, "MI": 3,    
        "TX": 5, "FL": 3,
        "HI": 6, "AK": 6
        
    },

    cart: [],

    invoice: {
        name: "",
        state: "",
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
    }
};

// ----------------------
// CONTROLLER
// ----------------------
const controller = {

    chooseItem() {
        const item = document.getElementById("itemSelect").value;
        if (!item) return alert("Please select an item.");

        MODEL.currentItem = item;
        show("step2");
    },

    addItem() {
        const qty = document.getElementById("qtySelect").value;
        if (!qty) return alert("Please select a quantity.");

        const item = MODEL.currentItem;
        const price = MODEL.prices[MODEL.items.indexOf(item)];

        MODEL.cart.push({ item, qty: Number(qty), price });

        show("step3");
    },

    moreItems(choice) {
        if (choice) {
            show("step1");
        } else {
            show("step4");
        }
    },

    finishOrder() {
        const state = document.getElementById("stateInput").value.toUpperCase();
        if (!MODEL.stateZones[state]) return alert("Invalid state abbreviation.");

        MODEL.invoice.state = state;
        MODEL.invoice.items = MODEL.cart;

        // subtotal
        MODEL.invoice.subtotal = MODEL.cart.reduce(
            (sum, i) => sum + i.price * i.qty, 0
        );

        // shipping
        const zone = MODEL.stateZones[state];
        MODEL.invoice.shipping = MODEL.zones[zone];

        // tax (10%)
        MODEL.invoice.tax = MODEL.invoice.subtotal * 0.10;

        // total
        MODEL.invoice.total =
            MODEL.invoice.subtotal +
            MODEL.invoice.shipping +
            MODEL.invoice.tax;

        view.displayInvoice();
    }
};

// ----------------------
// VIEW
// ----------------------
const view = {
    displayInvoice() {
        const inv = MODEL.invoice;

        const html = `
            <h2>Invoice</h2>
            <p>State: ${inv.state}</p>
            ${inv.items.map(i =>
                `<p>${i.item} x ${i.qty} = $${(i.price * i.qty).toFixed(2)}</p>`
            ).join("")}
            <p>Subtotal: $${inv.subtotal.toFixed(2)}</p>
            <p>Shipping: $${inv.shipping.toFixed(2)}</p>
            <p>Tax: $${inv.tax.toFixed(2)}</p>
            <p><strong>Total: $${inv.total.toFixed(2)}</strong></p>
        `;

        document.getElementById("invoice").innerHTML = html;
        show("invoice");
    }
};

// ----------------------
// HELPER
// ----------------------
function show(id) {
    // Hide all steps
    ["step1", "step2", "step3", "step4", "invoice"].forEach(step => {
        document.getElementById(step).classList.add("hidden");
    });
    // Show the target step
    document.getElementById(id).classList.remove("hidden");
}
