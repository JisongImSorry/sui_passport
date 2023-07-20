module sui_nft::nft {

  use sui::url::{Self, Url};
  use std::string;
  use sui::object::{Self, UID};
  use sui::transfer;
  use sui::tx_context::{Self, TxContext};
 
  // A simple NFT that can be minted by anyone
  struct NFT has key, store {
    // unique id of the NFT
    id: UID, 
    // name of the NFT
    name: string::String, 
    // description of the NFT
    description: string::String,
    // url of the NFT image
    url: Url,
    // Add any custom attributes here
  }

   // create and mint a new NFT
  public entry fun mint(name: vector<u8>, description: vector<u8>, url: vector<u8>, ctx: &mut TxContext) {
    // create the new NFT
    let nft = NFT {
      id: object::new(ctx),
      name: string::utf8(name),
      description: string::utf8(description),
      url: url::new_unsafe_from_bytes(url),
    };
    // mint and send the NFT to the caller
    let sender = tx_context::sender(ctx);
    // transfer the NFT to the caller
    transfer::public_transfer(nft, sender);
  }
  // transfer an NFT to another address
  public entry fun transfer(nft: NFT, recipient: address) {
        transfer::transfer(nft, recipient);
    }
}