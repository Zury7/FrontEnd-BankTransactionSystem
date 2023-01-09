import axios from 'axios';
import { HOST } from './config';
import { getDate } from '../utilities/dateFormat';

export async function getSavAccounts() {
  try {
    const response = await axios.post(`${HOST}/`);
    // change full date string to ISO format, yyyy-MM-DD
    for (let key in response.data) {
      const newDate = getDate(response.data[key].dateofbirth);
      response.data[key].dateofbirth = newDate;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get savings accounts list!');
  }
}

export async function addSavAccount(newAccount) {
  try {
    const response = await axios.post(`${HOST}/savings_account/add`, newAccount);
    console.log(response);
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to add to Savings Accounts list!');
  }
}

export async function updateSavAccount(updatedAccount) {
  try {
    console.log(updatedAccount);
    const response = await axios.put(
      `${HOST}/savings_account/${updatedAccount.account_no}`,
      updatedAccount
    );
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to update savings account!');
  }
}

export async function getSavAccount(account_no) {
  try {
    const response = await axios.get(`${HOST}/savings_account/${account_no}`);
    // console.log(response.data);
    //
    response.data.dateofbirth = getDate(response.data.dateofbirth);
    return response.data;
  } catch (err) {
    console.log(err);
    return await Promise.reject('Failed to get the savings account!');
  }
}