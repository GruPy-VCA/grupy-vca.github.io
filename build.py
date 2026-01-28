import os
import json

EVENTS_DIR = 'events'
SUMMARY_FILE = 'events_summary.json'

def build_events():
    all_events_data = []

    # Lista as pastas de eventos (ordenadas da mais recente para a mais antiga)
    folders = [f for f in os.listdir(EVENTS_DIR) if os.path.isdir(os.path.join(EVENTS_DIR, f))]
    folders.sort(reverse=True)

    for folder_name in folders:
        folder_path = os.path.join(EVENTS_DIR, folder_name)
        json_path = os.path.join(folder_path, 'data.json')
        photos_path = os.path.join(folder_path, 'fotos')

        if not os.path.exists(json_path):
            print(f"⚠️ Pulando {folder_name}: data.json não encontrado.")
            continue

        # 1. Renomear fotos para ordem numérica (01.jpg, 02.jpg...)
        gallery_files = []
        if os.path.exists(photos_path):
            # Filtra apenas imagens e ordena alfabeticamente antes de renomear
            images = [f for f in os.listdir(photos_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            images.sort() 

            for index, filename in enumerate(images, start=1):
                extension = os.path.splitext(filename)[1].lower()
                new_name = f"{index:02d}{extension}" # Formato 01.jpg, 02.jpg
                
                old_file_path = os.path.join(photos_path, filename)
                new_file_path = os.path.join(photos_path, new_name)
                
                # Renomeia apenas se o nome for diferente para evitar erros
                if filename != new_name:
                    os.rename(old_file_path, new_file_path)
                
                gallery_files.append(new_name)

        # 2. Ler o data.json original e atualizar com os novos dados
        with open(json_path, 'r', encoding='utf-8') as f:
            event_data = json.load(f)
        
        # Atualiza as referências de imagem no dicionário
        event_data['images']['gallery'] = gallery_files
        event_data['folder_path'] = f'events/{folder_name}'
        
        # Opcional: Salva o data.json da pasta atualizado com a nova lista de fotos
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(event_data, f, indent=4, ensure_ascii=False)

        all_events_data.append(event_data)

    # 3. Gerar o índice global para a Landing Page
    with open(SUMMARY_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_events_data, f, indent=4, ensure_ascii=False)

    print(f"✅ Sucesso: {len(all_events_data)} eventos processados e fotos renomeadas.")

if __name__ == "__main__":
    build_events()