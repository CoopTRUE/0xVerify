declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    namespace Superforms {
      type Message = {
        recoveredAddress: string
        verified: boolean | null
      }
    }
  }
}

export {}
