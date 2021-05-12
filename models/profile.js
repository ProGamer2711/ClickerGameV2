const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
    },
    Shop: {
        Workers: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            },
            income: {
                type: Number,
                required: true
            }
        },
        ClickUpgrades: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            }
        },
        SouvenirShops: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            },
            income: {
                type: Number,
                required: true
            }
        },
        BookStores: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            },
            income: {
                type: Number,
                required: true
            }
        },
        ClothesShops: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            },
            income: {
                type: Number,
                required: true
            }
        },
        PhoneStores: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            },
            income: {
                type: Number,
                required: true
            }
        },
        ShoeShops: {
            count: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            },
            startingCost: {
                type: Number,
                required: true
            },
            moneyAdd: {
                type: Number,
                required: true
            },
            income: {
                type: Number,
                required: true
            }
        }
    },
    returnAmountLoan: {
        type: Number,
        required: false,
    },
    returnAmountDeposit: {
        type: Number,
        required: false,
    }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
