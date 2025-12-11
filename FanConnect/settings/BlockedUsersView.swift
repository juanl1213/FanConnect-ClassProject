//
//  BlockedUsersView.swift
//  FanConnect
//
//  Created by user on 12/1/25.
//

import SwiftUI

struct BlockedUser: Identifiable {
    let id: String
    let name: String
    let username: String
}

struct BlockedUsersView: View {
    @State private var blockedUsers: [BlockedUser] = [
        BlockedUser(id: "1", name: "Alex P.", username: "@alexp"),
        BlockedUser(id: "2", name: "Jordan R.", username: "@jordanr")
    ]
    
    var onClose: () -> Void
    
    var body: some View {
        NavigationView {
            Group {
                if blockedUsers.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "hand.raised.fill")
                            .font(.system(size: 40))
                            .foregroundColor(.orange)
                        Text("No blocked users")
                            .font(.headline)
                        Text("You haven't blocked anyone yet. If you block a user, they'll appear here.")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal, 32)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color(.systemGroupedBackground))
                } else {
                    List {
                        Section(header: Text("Blocked Users")) {
                            ForEach(blockedUsers) { user in
                                HStack(spacing: 12) {
                                    ZStack {
                                        Circle()
                                            .fill(
                                                LinearGradient(
                                                    gradient: Gradient(colors: [Color.blue, Color.purple]),
                                                    startPoint: .topLeading,
                                                    endPoint: .bottomTrailing
                                                )
                                            )
                                            .frame(width: 40, height: 40)
                                        
                                        Text(initials(for: user.name))
                                            .font(.headline)
                                            .foregroundColor(.white)
                                    }
                                    
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(user.name)
                                            .font(.body)
                                        Text(user.username)
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                    }
                                    
                                    Spacer()
                                    
                                    Button(action: {
                                        unblock(user)
                                    }) {
                                        Text("Unblock")
                                            .font(.subheadline)
                                            .foregroundColor(.blue)
                                    }
                                }
                                .padding(.vertical, 4)
                            }
                        }
                    }
                    .listStyle(InsetGroupedListStyle())
                }
            }
            .navigationBarTitle("Blocked Users", displayMode: .inline)
            .navigationBarItems(
                leading: Button("Close") {
                    onClose()
                }
            )
        }
    }
    
    private func initials(for name: String) -> String {
        let components = name.split(separator: " ")
        let initials = components.prefix(2).compactMap { $0.first }.map { String($0) }
        return initials.joined()
    }
    
    private func unblock(_ user: BlockedUser) {
        blockedUsers.removeAll { $0.id == user.id }
    }
}

struct BlockedUsersView_Previews: PreviewProvider {
    static var previews: some View {
        BlockedUsersView(onClose: {})
    }
}


