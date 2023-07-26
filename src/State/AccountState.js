import AccountContext from "../Context/AccountContext";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountState = (props) => {
  // User Logout
  const logout = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.signOut();
        resolve(user);
      } else {
        reject();
      }
    });
  };

  // User Session
  const getUserSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject(err);
          } else {
            const attributes = new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  console.log(err.message);
                  reject(err);
                } else {
                  const results = {};
                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }
                  resolve(results);
                  console.log("Attributes", results);
                  localStorage.setItem("name", results.name);
                  localStorage.setItem("userName", results.sub);
                }
              });
            });
            resolve({ user, ...session, ...attributes });
          }
        });
      } else {
        reject();
      }
    });
  };
  // user registation
  const signUp = async (email, name, password) => {
    return await new Promise((resolve, reject) => {
      const attributeList = [];

      const userName = {
        Name: "name",
        Value: name,
      };

      attributeList.push(userName);

      UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          console.log("Registration Failed!", err.message);
          reject();
        } else {
          console.log("Account Created Successfully", data);
          resolve();
        }
      });
    });
  };

  // User Authentication
  const Authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("Login Successful!", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("Login Failed!", err.message);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("New Password Required!", data);
          resolve(data);
        },
      });
    });
  };

  return (
    <AccountContext.Provider
      value={{ signUp, Authenticate, getUserSession, logout }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
