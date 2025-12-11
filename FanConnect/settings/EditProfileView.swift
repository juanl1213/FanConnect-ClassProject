//
//  EditProfileView.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//
import SwiftUI

struct EditProfileView: View {
    @State private var fullName: String = "Your Name"
    @State private var username: String = "yourname"
    @State private var bio: String = ""
    @State private var favoriteTeam: String = "Manchester United"
    
    var onClose: () -> Void
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Profile")) {
                    TextField("Full Name", text: $fullName)
                    TextField("Username", text: $username)
                        .autocapitalization(.none)
                }
                
                Section(header: Text("About")) {
                    TextField("Short bio", text: $bio)
                }
                
                Section(header: Text("Favorites")) {
                    TextField("Favorite Team", text: $favoriteTeam)
                }
            }
            .navigationBarTitle("Edit Profile", displayMode: .inline)
            .navigationBarItems(
                leading: Button("Close") {
                    onClose()
                },
                trailing: Button("Save") {
                    // Save profile changes
                    onClose()
                }
            )
        }
    }
}

struct EditProfileView_Previews: PreviewProvider {
    static var previews: some View {
        EditProfileView(onClose: {})
    }
}



