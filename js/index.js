
const {createApp}= Vue;
const app = createApp({
  data(){
    return{
      email:'',
      contrasena:'',
      email2: '',
      contrasena2:'',
      nombre:'',
      apellido:'',
      cuit:'',
      direccion:'',
      telefono:'',
      fechaNac:'',
    }
  },
  methods:{
  Login() {
  axios.post('/api/login', `email=${this.email}&contrasena=${this.contrasena}`)
    .then(response => {
      if (this.email === "florys_211@hotmail.com") {
        window.location.href =('/manager/manager.html');
      } else {
        window.location.href = '/html/paquetes.html';
      }
    })
    .catch(error => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ms-1',
          cancelButton: 'btn btn-danger ms-1'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Tienes cuenta?',
        text: "No puedes acceder sin ella",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si tengo',
        cancelButtonText: "No tengo",
        confirmButtonColor: '#0DB4F3',
        cancelButtonColor: '#FF8A80',
        reverseButtons: true
      })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              icon: 'error',
              title: '¿Estás seguro?',
              text: 'Esta información es incorrecta, intenta nuevamente por favor',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0DB4F3',
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Crea una cuenta por favor',
              'error'
            );
          }
        });
    });
},


    /* window.location.replace('http://localhost:8080/h2-console');*/


    Register() {
      axios
        .post('/api/clientes', `nombre=${this.nombre}&apellido=${this.apellido}&cuit=${this.cuit}&direccion=${this.direccion}&telefono=${this.telefono}&email=${this.email2}&contrasena=${this.contrasena2}&fechaNac=${this.fechaNac}`)
        .then(response => axios.post('/api/login', `email=${this.email2}&contrasena=${this.contrasena2}`)
          .then(response => window.location.href = '/html/paquetes.html')
          .catch(error => {
            Swal.fire({
                icon: 'error',
                text: error.response.data,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#0DB4F3',}
            )}))
            .catch(error => {
              Swal.fire({
                  icon: 'error',
                  text: error.response.data,
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#0DB4F3',}
              )
          })
    }
  }
})

app.mount('#app');


function NavBar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.top = "0";
    document.getElementById("roll_back").style.display = "flex";
  } else {
    document.getElementById("navbar").style.top = "-130px";
    document.getElementById("roll_back").style.display = "none";
  }
}