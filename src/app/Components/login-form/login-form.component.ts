import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  cad: boolean = false
  mensagem: string = ''
  logado: boolean = false
  isToastOpen = false;
  user: any = { nome: '', foto: '' }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  cadUser(email: any, senha: any, RpSenha: any) {
    if (email == '' || senha == '' || RpSenha == "") {
      this.mensagem = 'Preencha todos os campos do formulario!'
      this.setOpen(true)
    } else if (senha != RpSenha) {
      this.mensagem = 'As senhas precisam ser iguais!'
      this.setOpen(true)
    } else {
      this.mensagem = 'Usuário cadastrado com sucesso!'
      this.setOpen(true)
      this.cad = !this.cad
      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }

  Logar(email: any, senha: any) {
    signInWithEmailAndPassword(this.auth, email, senha)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email)
        this.mensagem = `Usuário: ${user.email} Logado com sucesso!`
        this.setOpen(true)
        this.logado = !this.logado
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    this.mensagem = `Usuário deslogado com sucesso!`
    this.setOpen(true)
    this.logado = !this.logado
    this.logoutComGoogle()
  }

  loginComGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.mensagem = `Usuário: ${result.user.displayName} Logado com sucesso!`
        this.user.nome=result.user.displayName
        this.user.foto=result.user.photoURL
        this.setOpen(true)
        this.logado = !this.logado
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  logoutComGoogle() {
    return signOut(this.auth)
  }

  constructor(private auth: Auth) { }

  ngOnInit() { }

}



