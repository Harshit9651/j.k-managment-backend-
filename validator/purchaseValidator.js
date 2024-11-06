const { body } = require("express-validator");

const validateMandiPurchase = [
  body("DelarName").notEmpty().withMessage("Dealer Name is required"),

  body("itemType")
    .notEmpty()
    .withMessage("Item Type is required")
    .withMessage("Item Type must be one of Cotton,Mustard Oil, or Other"),

  body("weight")
    .notEmpty()
    .withMessage("Weight is required")
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),

  body("pricePerUnit")
    .notEmpty()
    .withMessage("Price per Unit is required")
    .isFloat({ gt: 0 })
    .withMessage("Price per Unit must be a positive number"),

  body("purchaseDate")
    .notEmpty()
    .withMessage("Purchase Date is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD"),

  body("paidAmount")
    .notEmpty()
    .withMessage("amount must be paid ")
    .isFloat({ min: 0 })
    .withMessage("Amount Paid must be a non-negative number"),

  body("duedAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount Paid must be a non-negative number"),

  body("add")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Add must be a non-negative number"),

  body("less")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Less must be a non-negative number"),

  body("dami")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Dhami must be a non-negative number"),

  body("pal")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Pal must be a non-negative number"),
];
const validateDirectPurchase = [
  body("dealerName").notEmpty().withMessage("Dealer Name is required"),
  body("itemType")
    .notEmpty()
    .withMessage("Item Type is required")
    .isIn(["Cotton", "Mustard Oil", "Other"])
    .withMessage("Item Type must be one of Cotton, Meal, Rice, or Other"),
  body("weight")
    .notEmpty()
    .withMessage("Weight is required")
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("pricePerUnit")
    .notEmpty()
    .withMessage("Price per Unit is required")
    .isFloat({ gt: 0 })
    .withMessage("Price per Unit must be a positive number"),
  body("purchaseDate")
    .notEmpty()
    .withMessage("Purchase Date is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD"),
  body("paidAmount")
    .notEmpty()
    .withMessage("Amount Paid is required")
    .isFloat({ min: 0 })
    .withMessage("Amount Paid must be a non-negative number"),
  body("totalPayment")
    .notEmpty()
    .withMessage("Total Payment is required")
    .isFloat({ min: 0 })
    .withMessage("Total Payment must be a non-negative number"),
];

// Validation for Broker Purchase
const validateBrokerPurchase = [
  body("brokerName").notEmpty().withMessage("Broker Name is required"),
  body("brokerCommission")
    .notEmpty()
    .withMessage("Brokerage Commission is required")
    .isFloat({ min: 0 })
    .withMessage("Brokerage Commission must be a non-negative number"),
  body("itemType")
    .notEmpty()
    .withMessage("Item Type is required")
    .isIn(["Cotton", "Mustard Oil", "Other"])
    .withMessage("Item Type must be one of Cotton, Meal, Rice, or Other"),
  body("weight")
    .notEmpty()
    .withMessage("Weight is required")
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("pricePerUnit")
    .notEmpty()
    .withMessage("Price per Unit is required")
    .isFloat({ gt: 0 })
    .withMessage("Price per Unit must be a positive number"),
  body("purchaseDate")
    .notEmpty()
    .withMessage("Purchase Date is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD"),
  body("paidAmount")
    .notEmpty()
    .withMessage("Amount Paid is required")
    .isFloat({ min: 0 })
    .withMessage("Amount Paid must be a non-negative number"),
  body("totalPayment")
    .notEmpty()
    .withMessage("Total Payment is required")
    .isFloat({ min: 0 })
    .withMessage("Total Payment must be a non-negative number"),
];
module.exports = {validateMandiPurchase,validateBrokerPurchase,validateDirectPurchase};
