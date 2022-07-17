const user = JSON.parse(localStorage.getItem('user')) || undefined;
if (!user) {
  window.location.href = '/dang-nhap';
} else {
  const tBody = document.querySelector('tbody');
  const htmls = `
    <tr>
      <th scope="row">${ user.username }</th>
      <td>${ user.fullName }</td>
      <td>${ user.address }</td>
      <td>${ user.gender }</td>
    </tr>
  `;
  tBody.innerHTML = htmls;
}
