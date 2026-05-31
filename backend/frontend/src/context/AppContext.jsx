import { createContext, useContext, useReducer, useMemo } from "react";

const AppContext = createContext();

const demoUser = {
  name: "Demo User",
  userId: "PLUG-DEMO-001",
  email: "demo@theplug.store",
  phone: "0201234567",
  walletBalance: 0.9,
  loyaltyPoints: 555,
  totalOrders: 44,
  successfulOrders: 43,
  joinDate: "January 2025",
  tier: "Gold",
  referralCode: "PLUG-DEMO-001",
  affiliateBalance: 0.0,
  totalReferrals: 0,
  totalEarned: 0.0,
  resellerSettings: {
    storeName: "",
    domain: "",
    isActive: false,
  },
};

const initialState = {
  user: { ...demoUser },
  orders: [],
  transactions: [],
  loyaltyHistory: [],
  dailyRewards: [
    { day: 1, points: 10, claimed: true },
    { day: 2, points: 20, claimed: true },
    { day: 3, points: 30, claimed: false },
    { day: 4, points: 40, claimed: false },
    { day: 5, points: 50, claimed: false },
    { day: 6, points: 75, claimed: false },
    { day: 7, points: 100, claimed: false },
  ],
  smmOrders: [],
  cart: [],
  notifications: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "UPDATE_WALLET": {
      const newBalance = state.user.walletBalance + action.payload.amount;
      return {
        ...state,
        user: {
          ...state.user,
          walletBalance: Math.round(newBalance * 100) / 100,
        },
        transactions: [
          {
            id: `TXN-${Date.now()}`,
            type: action.payload.amount > 0 ? "credit" : "debit",
            reference: `REF-${Date.now()}`,
            description: action.payload.description,
            amount: action.payload.amount,
            status: "successful",
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
          ...state.transactions,
        ],
      };
    }
    case "ADD_ORDER": {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        ...action.payload,
        status: "processing",
        date: new Date().toISOString().replace("T", " ").substring(0, 16),
      };
      const deductedBalance = state.user.walletBalance - action.payload.amount;
      return {
        ...state,
        orders: [newOrder, ...state.orders],
        user: {
          ...state.user,
          walletBalance: Math.round(deductedBalance * 100) / 100,
          totalOrders: state.user.totalOrders + 1,
          loyaltyPoints:
            state.user.loyaltyPoints + (action.payload.points || 0),
        },
        loyaltyHistory: action.payload.points
          ? [
              {
                type: "earn",
                points: action.payload.points,
                description: `${action.payload.network} Data ${action.payload.dataAmount} Purchase`,
                date: new Date()
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 16),
              },
              ...state.loyaltyHistory,
            ]
          : state.loyaltyHistory,
        transactions: [
          {
            id: `TXN-${Date.now()}`,
            type: "debit",
            reference: `REF-${Date.now()}`,
            description: `${action.payload.network || "Service"} - ${action.payload.dataAmount || action.payload.name}`,
            amount: -action.payload.amount,
            status: "successful",
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
          ...state.transactions,
        ],
      };
    }
    case "ADD_SMM_ORDER": {
      return {
        ...state,
        smmOrders: [
          {
            id: `SMM-${Date.now()}`,
            ...action.payload,
            status: "processing",
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
          ...state.smmOrders,
        ],
        user: {
          ...state.user,
          walletBalance:
            Math.round(
              (state.user.walletBalance - action.payload.totalCost) * 100,
            ) / 100,
        },
      };
    }
    case "REDEEM_POINTS": {
      const pointsToRedeem = action.payload;
      const ghsEquivalent = pointsToRedeem * 0.01;
      return {
        ...state,
        user: {
          ...state.user,
          loyaltyPoints: state.user.loyaltyPoints - pointsToRedeem,
          walletBalance:
            Math.round((state.user.walletBalance + ghsEquivalent) * 100) / 100,
        },
        loyaltyHistory: [
          {
            type: "redeem",
            points: -pointsToRedeem,
            description: `Points redeemed to wallet (₵${ghsEquivalent.toFixed(2)})`,
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
          ...state.loyaltyHistory,
        ],
        transactions: [
          {
            id: `TXN-${Date.now()}`,
            type: "credit",
            reference: `REF-${Date.now()}`,
            description: `Loyalty points redemption (${pointsToRedeem} pts)`,
            amount: ghsEquivalent,
            status: "successful",
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
          ...state.transactions,
        ],
      };
    }
    case "CLAIM_DAILY_REWARD": {
      const updatedRewards = state.dailyRewards.map((r, i) =>
        i === action.payload ? { ...r, claimed: true } : r,
      );
      const reward = state.dailyRewards[action.payload];
      return {
        ...state,
        dailyRewards: updatedRewards,
        user: {
          ...state.user,
          loyaltyPoints: state.user.loyaltyPoints + reward.points,
        },
        loyaltyHistory: [
          {
            type: "bonus",
            points: reward.points,
            description: `Daily reward - Day ${reward.day}`,
            date: new Date().toISOString().replace("T", " ").substring(0, 16),
          },
          ...state.loyaltyHistory,
        ],
      };
    }
    case "SAVE_RESELLER_SETTINGS": {
      return {
        ...state,
        user: { ...state.user, resellerSettings: action.payload },
      };
    }
    case "ADD_NOTIFICATION": {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 10),
      };
    }
    case "CLEAR_NOTIFICATIONS": {
      return { ...state, notifications: [] };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

export default AppContext;
