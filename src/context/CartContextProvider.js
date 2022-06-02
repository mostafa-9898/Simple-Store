import React, { useReducer, createContext, } from 'react';

const initialState = {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    checkout: false
}

const sumItems = items => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0)
    let total = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
    return { itemsCounter, total }
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // id on mahsoli ke click shod ro ba id harchi to state hast check mikone , age nabud
            if (!state.selectedItems.find(item => item.id === action.payload.id)) {
                // miad mahsol ro be state push mikone
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1,
                })
            }
            return {
                // state ghabli ro negahdar
                ...state,
                // selectedItems toye state ro update kon
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems),
                checkout: false
            }

        case 'REMOVE_ITEM':
            // hameye mahsolat ro be gheir az oni ke rosh click shode bar migardone mirize to (newSelectedItems)
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                // hala sabad jadid (newSelectedItems) ro mirize to selectedItems
                selectedItems: [...newSelectedItems],
                ...sumItems(newSelectedItems)
            }

        case 'INCREASE':
            //  age index array on mahsoli ke click shod ba indexi ke toye selectedItems hast barabar shod
            //  , index barabar ro mirize toye (indexI)
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id)
            // on mahsoli ke paida kard , yedume be (quantity) mahsol ezafe mikone
            state.selectedItems[indexI].quantity++
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }

        case 'DECREASE':
            //  age index array on mahsoli ke click shod ba indexi ke toye selectedItems hast barabar shod
            //  , index barabar ro mirize toye (indexI)
            const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id)
            // on mahsoli ke paida kard , yedume az (quantity) mahsol kam mikone
            state.selectedItems[indexD].quantity--
            return {
                ...state,
                ...sumItems(state.selectedItems)
            }

        case 'CHECKOUT':
            // age raft bara tasvie , state reset beshe va (checkout) barabar true
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: true
            }

        case 'CLEAR':
            // reset the state
            return {
                selectedItems: [],
                itemsCounter: 0,
                total: 0,
                checkout: false
            }

        default:
            return state
    }
}


export const CardContext = createContext()

const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)


    return (
        <CardContext.Provider value={{ state, dispatch }} >
            {children}
        </CardContext.Provider>
    );
};

export default CartContextProvider;