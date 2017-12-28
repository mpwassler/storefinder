from urllib.request import urlopen
from bs4 import BeautifulSoup
import googlemaps
import csv

# For educational purposes only. Don't run. Urls and keys redacted

# Script for scraping the mural names and addresses then GeoCoding 
# the addresses through googles geocoder. Outputs a CSV file of all the data.

index_page = '--------'
page = urlopen(index_page)
soup = BeautifulSoup(page, 'html.parser')

murals = []
for detail in soup.findAll('div', {'class':'details'}):
	link = detail.find('a', href=True)	
	murals.append(link['href'])
mural_data = []
for mural in murals:
	mural_page = urlopen(mural)
	soup = BeautifulSoup(mural_page, 'html.parser')
	location_tag = soup.find('label', text="Location")
	address = location_tag.find_next_sibling('div').text.strip()
	title = soup.find('h2', class_="entry-title").text.strip()
	mural_data.append((title, address))	
with open('index.csv', 'a') as csv_file:
 writer = csv.writer(csv_file)
 for title, address in mural_data:
 	writer.writerow([title, address])
gmaps = googlemaps.Client(key='--------')
geocoded_locations = []
with open('index.csv') as csvfile:
	address_reader = csv.reader(csvfile)
	for row in address_reader:
		print(row[1])
		geocode_result = gmaps.geocode(row[1])
		title = row[0]
		address = row[1]
		if geocode_result:
			lat = geocode_result[0]['geometry']['location']['lat']
			lng = geocode_result[0]['geometry']['location']['lng']
		else:	
			lat = 0
			lng = 0
		geocoded_locations.append((title, address, lat, lng))		
with open('index.csv') as csv_file:
	fieldnames = ['title', 'address', 'lat', 'lng']
	writer = csv.writer(csv_file)
	writer.writerow(fieldnames)
	for title, address, lat, lng in geocoded_locations:
 		writer.writerow([title, address, lat, lng])



	