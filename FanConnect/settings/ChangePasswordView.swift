//
//  ChangePasswordView.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//

import SwiftUI

struct ChangePasswordView: View {
    @State private var currentPassword: String = ""
    @State private var newPassword: String = ""
    @State private var confirmPassword: String = ""
    
    var onClose: () -> Void
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Current Password")) {
                    SecureField("Current Password", text: $currentPassword)
                }
                
                Section(header: Text("New Password")) {
                    SecureField("New Password", text: $newPassword)
                    SecureField("Confirm New Password", text: $confirmPassword)
                }
            }
            .navigationBarTitle("Change Password", displayMode: .inline)
            .navigationBarItems(
                leading: Button("Close") {
                    onClose()
                },
                trailing: Button("Save") {
                    // Validate and change password
                    onClose()
                }
            )
        }
    }
}

struct ChangePasswordView_Previews: PreviewProvider {
    static var previews: some View {
        ChangePasswordView(onClose: {})
    }
}



