// Example action creator for adding a documentary
 const addDocumentaries = (documentary) => {
  return {
    type: 'ADD_DOCUMENTARY',
    payload: documentary,
  }
 }
  
// Example action creator for adding a documentary
 const updateDocumentary = (documentary) => ({
    type: 'UPDATE_DOCUMENTARY',
    payload: documentary,
  });
// Example action creator for adding a documentary
 const deleteDocumentary = (documentary) => ({
    type: 'DELETE_DOCUMENTARY',
    payload: documentary,
  });
  const incrementValueAction = () => {
    return {type: 'increment'};
  };     
  // export const logOut = () => {
  //   return () => {
  //     // You can perform asynchronous operations here, such as API calls or clearing user data.
  //     // For simplicity, let's assume we're clearing some user data and dispatching a LOGOUT action.
  
  //     // Perform any asynchronous operations (e.g., API logout request, clearing user data)
  //     // ...

  //     console.log('Logout hobe ebar BANCHOD')
  
  //     // Dispatch the LOGOUT action when the asynchronous operation is complete
  //     // dispatch({ type: 'LOGOUT' });
  //   };
  // };
  
  export {addDocumentaries}