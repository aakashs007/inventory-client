export interface Order {
  id: string;
  transferType: string;
}

export interface Options {
  value?: string | number;
  label?: string | number;
}

export const OrderTypeOptions = [
  {
    value: "purchase",
    label: "Purchase"
  },
  {
    value: "stock_transfer",
    label: "Stock transfer",
  },
  {
    value: "replacement",
    label: "Replacement",
  },
  {
    value: "return",
    label: "Return",
  },
  {
    value: "removed",
    label: "Removed",
  },
  {
    value: "repaired",
    label: "Repaired",
  },
  {
    value: "distribution_sale",
    label: "Distribution Sale",
  },
  {
    value: "installation",
    label: "Installation",
  },
  {
    value: "complaint",
    label: "Complaint",
  },
  {
    value: "amc",
    label: "AMC",
  }
];

export const orderTransferTypeOptions = [
  {
    label: "In",
    value: "in"
  },
  {
    label: "Out",
    value: "out"
  }
]

export const orderPaymentModeOptions = [
  {
    label: "Bill",
    value: "bill"
  },
  {
    label: "Cash",
    value: "cash"
  },
  {
    label: "Gate Pass",
    value: "gate_pass"
  }
]

export const orderStatusOptions: Array<Options> = [
  {
    label: "Created",
    value: "created"
  },
  {
    label: "Sent",
    value: "sent"
  },
  {
    label: "Recieved",
    value: "recieved"
  }
]

export type ProductCreateBody = {
  order_id?: string | number;
  product_id?: string | number;
  serial_number?: string;
  model_number?: string;
  quantity?: number;
  unit?: number;
}

export type OrderCreateBody = {
  status?: string;
  transfer_type?: string;
  order_type?: string;
  payment_mode?: string;
  sent_from_user_id?: string;
  sent_to_user_id?: string;
  issued_to_warehouse_id?: string;
  issued_for_client_name?: string;
  issued_for_client_address?: string;
  issued_for_client_pincode?: string;
  service_report_number?: string;
  delievery_challan_number?: string;  
}