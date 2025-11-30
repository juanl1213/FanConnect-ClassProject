//
//  SearchView.swift
//  FanConnect
//
//  Created by user on 11/29/25.
//

import SwiftUI

struct SearchView: View {
    @State private var searchQuery: String = ""
    @State private var venueTypeFilter: VenueTypeFilter = .all
    
    init(onEventSelect: @escaping (String) -> Void) {
            self.onEventSelect = onEventSelect
        }
    
    var onEventSelect: (String) -> Void
    
    enum VenueTypeFilter: String, CaseIterable {
        case all = "all"
        case stadium = "stadium"
        case bar = "bar"
        case screening = "screening"
        
        var displayName: String {
            switch self {
            case .all: return "All Venues"
            case .stadium: return "🏟️ Stadium"
            case .bar: return "🍺 Bar"
            case .screening: return "📺 Screening"
            }
        }
    }
    
    // Using the same mockEvents from HomeView
    private var allEvents: [Event] = mockEvents
    
    private var filteredEvents: [Event] {
        allEvents.filter { event in
            let matchesSearch = searchQuery.isEmpty ||
                event.homeTeam.localizedCaseInsensitiveContains(searchQuery) ||
                event.awayTeam.localizedCaseInsensitiveContains(searchQuery) ||
                event.league.localizedCaseInsensitiveContains(searchQuery) ||
                event.venue.localizedCaseInsensitiveContains(searchQuery) ||
                event.location.localizedCaseInsensitiveContains(searchQuery)
            
            let matchesVenue: Bool
            switch venueTypeFilter {
            case .all:
                matchesVenue = true
            case .stadium:
                matchesVenue = event.venueType == .stadium
            case .bar:
                matchesVenue = event.venueType == .bar
            case .screening:
                matchesVenue = event.venueType == .screening
            }
            
            return matchesSearch && matchesVenue
        }
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                // Search Header
                VStack(alignment: .leading, spacing: 12) {
                    Text("Search Events")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                    
                    // Search Input
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.secondary)
                            .padding(.leading, 12)
                        
                        TextField("Search teams, leagues, venues...", text: $searchQuery)
                            .textFieldStyle(PlainTextFieldStyle())
                        
                        if !searchQuery.isEmpty {
                            Button(action: {
                                searchQuery = ""
                            }) {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(.secondary)
                                    .padding(.trailing, 12)
                            }
                        }
                    }
                    .frame(height: 50)
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(.separator), lineWidth: 1)
                    )
                }
                
                // Venue Type Filters
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Image(systemName: "slider.horizontal.3")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                        Text("Venue Type")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(VenueTypeFilter.allCases, id: \.self) { filter in
                                Button(action: {
                                    venueTypeFilter = filter
                                }) {
                                    Text(filter.displayName)
                                        .font(.subheadline)
                                        .fontWeight(.medium)
                                        .foregroundColor(venueTypeFilter == filter ? .white : .primary)
                                        .padding(.horizontal, 16)
                                        .padding(.vertical, 8)
                                        .background(
                                            venueTypeFilter == filter
                                                ? Color.blue
                                                : Color(.systemGray5)
                                        )
                                        .cornerRadius(20)
                                }
                            }
                        }
                        .padding(.horizontal, 4)
                    }
                }
                
                // Clear Filters Button
                if !searchQuery.isEmpty || venueTypeFilter != .all {
                    Button(action: {
                        searchQuery = ""
                        venueTypeFilter = .all
                    }) {
                        Text("Clear all filters")
                            .font(.subheadline)
                            .foregroundColor(.blue)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 12)
                    }
                }
                
                // Results Count
                HStack {
                    Text("\(filteredEvents.count) \(filteredEvents.count == 1 ? "result" : "results") found")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    Spacer()
                }
                
                // Results
                if filteredEvents.isEmpty {
                    // Empty State
                    VStack(spacing: 16) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 32))
                            .foregroundColor(.secondary)
                            .frame(width: 64, height: 64)
                            .background(Color(.systemGray5))
                            .clipShape(Circle())
                        
                        Text("No results found")
                            .font(.headline)
                            .foregroundColor(.primary)
                        
                        Text("Try adjusting your search or filters")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 40)
                    .background(Color(.systemBackground))
                    .cornerRadius(16)
                } else {
                    // Event Cards
                    VStack(spacing: 16) {
                        ForEach(filteredEvents) { event in
                            EventCard(event: event) {
                                onEventSelect(event.id)
                            }
                        }
                    }
                }
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
    }
}

// MARK: - Preview
struct SearchView_Previews: PreviewProvider {
    static var previews: some View {
        SearchView(onEventSelect: { eventId in
            print("Selected event: \(eventId)")
        })
    }
}


