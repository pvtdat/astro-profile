alter table public.certifications
  add column if not exists skills text[] not null default '{}';

update public.certifications
set skills = case title
  when 'Aptis ESOL Certificate' then array['Aptis ESOL General - CEFR B2']
  when 'Machine Learning: Introduction with Regression' then array['Machine Learning', 'Linear Regression', 'Multiple Linear Regression', 'Regression', 'Model Evaluation']
  when 'Machine Learning: K-Nearest Neighbors' then array['Machine Learning', 'K-Nearest Neighbors', 'Classification', 'Supervised Learning', 'Distance Metrics', 'Data Normalization', 'Model Evaluation']
  when 'Machine Learning: Random Forests & Decision Trees' then array['Machine Learning', 'Decision Trees', 'Random Forests', 'Classification', 'Supervised Learning', 'Ensemble Learning', 'Model Evaluation']
  when 'Machine Learning: Clustering with K-Means' then array['Machine Learning', 'Unsupervised Learning', 'K-Means Clustering', 'K-Means++', 'Clustering', 'Data Analysis', 'Model Evaluation']
  when 'Machine Learning: Perceptrons' then array['Machine Learning', 'Perceptron', 'Classification', 'Supervised Learning', 'Linear Classification', 'Model Training', 'Model Evaluation']
  else skills
end
where skills = '{}';

create index if not exists certifications_display_order_idx
  on public.certifications (display_order);

create index if not exists certifications_featured_published_idx
  on public.certifications (featured, published);