import api from "./axios";

const TEAM = "9-3";

// 롤링 페이퍼 대상 목록 가져오기
const getRecipients = async () => {
  const response = await api.get(`/${TEAM}/recipients/`);
  return response.data;
};

// 롤링 페이퍼 대상 가져오기
const getRecipientById = async (recipientId) => {
  const response = await api.get(`/${TEAM}/recipients/${recipientId}/`);
  return response.data;
};

// 롤링 페이퍼 대상 생성하기
const addRecipient = async (recipientData) => {
  const response = await api.post(`/${TEAM}/recipients/`, recipientData);
  return response.data;
};

// 롤링 페이퍼 대상 삭제하기
const deleteRecipientById = async (recipientId) => {
  const response = await api.delete(`/${TEAM}/recipients/${recipientId}/`);
  return response.data;
};

// 롤링 페이퍼 대상에게 메세지 생성하기
const addMessageToRecipient = async (recipientId, messageData) => {
  const response = await api.post(
    `/${TEAM}/recipients/${recipientId}/messages/`,
    messageData
  );
  return response.data;
};

//롤링 페이퍼 대상의 메세지 삭제하기
const deleteMessageToRecipient = async (recipientId) => {
  const response = await api.delete(`/${TEAM}/messages/${recipientId}/`);
  return response.data;
};

// 롤링 페이퍼 대상의 메세지 목록 가져오기 -> 9.4 정준영 수정
const getMessagesByRecipientId = async (recipientId, limit) => {
  // 초기 렌더링 시에는 limit이 없기에 모든 메시지를 가져옴
  let url = `/${TEAM}/recipients/${recipientId}/messages/`;
  // limit이 정의된 경우 쿼리 파라미터에 추가
  if (limit) {
    url += `?limit=${limit}`;
  }
  const response = await api.get(url);
  return response.data;
};

// 롤링 페이퍼 대상에게 리액션 달기
const addReactionToRecipient = async (recipientId, reactionData) => {
  const response = await api.post(
    `/${TEAM}/recipients/${recipientId}/reactions/`,
    reactionData
  );
  return response.data;
};

// 롤링 페이퍼 대상에게 리액션 목록 가져오기 ( limit, offset 추가)
const getReactionsByRecipientId = async (
  recipientId,
  limit = 10,
  offset = 0
) => {
  const response = await api.get(
    `/${TEAM}/recipients/${recipientId}/reactions/?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

const getAllUser = async (params = { limit: 10, offset: 0 }) => {
  const query = new URLSearchParams(params).toString();
  const response = await api.get(`/${TEAM}/recipients/?${query}`);
  return response.data;
};

export {
  getRecipients,
  getRecipientById,
  addRecipient,
  deleteRecipientById,
  deleteMessageToRecipient,
  addMessageToRecipient,
  getMessagesByRecipientId,
  addReactionToRecipient,
  getReactionsByRecipientId,
  getAllUser,
};
