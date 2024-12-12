    const users = [];
    let currentUser = null;

    // table
    function renderTableUser() {
      const tableUser = document.getElementById('tableUser');
      tableUser.innerHTML = '';
      users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="border border-black">${index + 1}</td>
          <td class="border border-black">${user.firstName} ${user.lastName}</td>
          <td class="border border-black">${user.email}</td>
          <td class="border border-black">${user.role}</td>
          <td class="border border-black text-center">
              ${`<button class="btn btn-warning btn-sm btn-edit" onclick="editUser(${index})"><i class="bi bi-pencil-square"></i></button>
                 <button class="btn btn-danger btn-sm btn-delete" onclick="deleteUser(${index})"><i class="bi bi-person-x"></i></button>`
              }
          </td>
        `;
        tableUser.appendChild(row);
      });

    }
    // table //

    // function alert
    function showAlert(message, color, timeout = 1500) {
      const alertBox = document.querySelector('.alert-box');
      const alertText = document.querySelector('.text-alert');
      const alertBody = document.querySelector('.alert-body');
    
      alertText.innerText = message;
      alertBody.style.backgroundColor = color;
      alertBox.style.display = 'flex';
    
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, timeout);
    }
    // function alert //

    // register
    document.getElementById('registerForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const role = document.getElementById('role').value;

      if (users.some((u) => u.email === email)) {
        showAlert('המשתמש עם המאימייל הזה כבר קיים', 'rgb(34 197 94)', 1500);
        return;
      }

      users.push({ firstName, lastName, email, password, role });
      showAlert('ההרשמה בוצעה בהצלחה! כעת תוכל להיכנס למערכת', 'rgb(34 197 94)', 2500);
      this.reset();
      renderTableUser();
    });
    // register //


    // login
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        currentUser = user;
      
        showAlert(
          `Welcome, ${user.firstName} ${user.lastName}!`, 
          'rgb(5 150 105)', 
          3000 
        );
      
        document.getElementById('loginWindow').style.display = 'none';
        renderTableUser();
      } else {
        // Ошибка входа
        showAlert(
          'אימייל או סיסמה שגויים',
          'rgb(136 19 55)', 
          1500
        );
      }
      
    });
    // login //

    // delete user
    function deleteUser(index) {
      if (currentUser && currentUser.role === 'admin') {
        users.splice(index, 1);
        renderTableUser();
      } else {
        showAlert('רק מנהל יכול למחוק משתמשים', 'rgb(190 18 60)', 1500);
      }
    }   
  // delete user //

    // edit user
    function editUser(index) {
      if (currentUser && currentUser.role === 'admin') {
        const user = users[index];
        const newFirstName = prompt('הכנס שם חדש:', user.firstName);
        const newLastName = prompt('הכנס שם משפחה חדש:', user.lastName);
        const newPassword = prompt('הכנס סיסמה חדשה:', user.password);

        if (newFirstName) user.firstName = newFirstName;
        if (newLastName) user.lastName = newLastName;
        if (newPassword) user.password = newPassword;

        renderTableUser();
      } else {
        showAlert('רק מנהל יכול לערוך משתמשים', 'rgb(251 191 36)', 1500);
      }
    }
    // edit user //


    // open/close login window
    const openLoginWindow = document.getElementById('openLoginWindow');
    const closeLoginWindow = document.getElementById('closeLoginWindow');
    const loginWindow = document.getElementById('loginWindow');

    openLoginWindow.addEventListener('click', (e) => {
      e.preventDefault();
      loginWindow.style.display = 'flex';
    });

    closeLoginWindow.addEventListener('click', () => {
      loginWindow.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === loginWindow) {
        loginWindow.style.display = 'none';
      }
    });
    // open/close login window //




        // form
  // document.getElementById('registerBtn').addEventListener('click', function(event) {
  //   event.preventDefault();
    
  //   const form = document.getElementById('registerForm');
  //   const input = document.querySelectorAll('input');
    
  //   let formValid = true;
  
  //   input.forEach(input => {
  //     if (!input.value.trim()) {
  //       input.classList.add('invalid');
  //       formValid = false;
  //       input.placeholder = "* נא למלא את השדה";
  //     } else {
  //       input.classList.remove('invalid');
  //     }
  //   });
  
  //   if (formValid) {
  //     form.submit();
  //   }
  // });
  // form end