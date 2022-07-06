// Helper function
const SendResponse = (status, message, data, OthersData) => {
  return {
    status,
    message,
    data: data || [],
    ...OthersData,
  };
};

module.exports = SendResponse;