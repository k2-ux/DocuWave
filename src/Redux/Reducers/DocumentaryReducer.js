const DocumentaryReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_DOCUMENTARY':
        return [...state, action.payload];
    //   case 'DELETE_DOCUMENTARY':
    //     // Implement logic to remove a documentary
    //     return state.filter(doc => doc.id !== action.payload.id);
    //   // Handle other CRUD operations similarly
      default:
        return state;
    }
  };


  export default DocumentaryReducer;